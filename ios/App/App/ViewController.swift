import UIKit
import Capacitor
import ObjectiveC
import WebKit
import AVFoundation

class ViewController: CAPBridgeViewController, WKScriptMessageHandler {

    // ─── 1. Pre-creation config (belt) ───────────────────────────────────────
    override func webViewConfiguration(for instanceConfiguration: InstanceConfiguration) -> WKWebViewConfiguration {
        let config = super.webViewConfiguration(for: instanceConfiguration)
        config.userContentController.add(self, name: "nativeTextInput")
        print("⚡ [NativeInput] webViewConfiguration — handler added to pre-creation config")
        return config
    }

    // ─── 2. Post-creation handler (suspenders) ────────────────────────────────
    //
    // WKWebView copies the configuration internally on init. Handlers added to
    // the original config object may not appear in the live config's UCC.
    // Adding again to webView.configuration.userContentController (the live copy)
    // guarantees the JS context sees window.webkit.messageHandlers.nativeTextInput.
    override func webView(with frame: CGRect, configuration: WKWebViewConfiguration) -> WKWebView {
        let wv = NoGateWebView(frame: frame, configuration: configuration)
        let ucc = wv.configuration.userContentController
        ucc.removeScriptMessageHandler(forName: "nativeTextInput") // prevent duplicate-name crash
        ucc.add(self, name: "nativeTextInput")
        print("⚡ [NativeInput] handler registered on live UCC — NoGateWebView created")
        return wv
    }

    override func viewDidLoad() {
        // Allow audio to play even when the iPhone mute/silent switch is on.
        // .playback category is required for coaching session bell to be audible
        // in silent mode — the same category used by music and alarm apps.
        try? AVAudioSession.sharedInstance().setCategory(
            .playback, mode: .default, options: .mixWithOthers)
        try? AVAudioSession.sharedInstance().setActive(true)

        // Both patches BEFORE super.viewDidLoad() so they are in place when
        // WebKit installs its gesture recognizers during WKWebView setup.
        ViewController.preventDeferringGestureRecognizers()
        ViewController.patchWKWebViewFocusScan()
        super.viewDidLoad()

        NotificationCenter.default.addObserver(
            self, selector: #selector(keyboardWillShow),
            name: UIResponder.keyboardWillShowNotification, object: nil)
        NotificationCenter.default.addObserver(
            self, selector: #selector(keyboardWillHide),
            name: UIResponder.keyboardWillHideNotification, object: nil)
    }

    @objc private func keyboardWillShow(_ notification: Notification) {
        webView?.scrollView.isScrollEnabled = false
    }
    @objc private func keyboardWillHide(_ notification: Notification) {
        webView?.scrollView.isScrollEnabled = true
    }

    // MARK: - WKScriptMessageHandler

    func userContentController(
        _ userContentController: WKUserContentController,
        didReceive message: WKScriptMessage
    ) {
        print("⚡ [NativeInput] received: \(message.name)")
        guard message.name == "nativeTextInput",
              let body = message.body as? [String: Any],
              let action = body["action"] as? String,
              action == "show" else { return }

        let text        = body["text"]        as? String ?? ""
        let placeholder = body["placeholder"] as? String ?? ""
        print("⚡ [NativeInput] showing editor, text.count=\(text.count)")

        DispatchQueue.main.async { [weak self] in
            self?.presentNativeTextEditor(text: text, placeholder: placeholder)
        }
    }

    private func presentNativeTextEditor(text: String, placeholder: String) {
        guard presentedViewController == nil else { return }

        // WKContentView (subview of WKWebView) proactively establishes RTI whenever
        // any keyboard appears — even for a different view. If WebContent can't respond
        // in time (CPU-only rendering), this causes Reporter disconnected × 9 →
        // WebPageProxy::didBecomeUnresponsive → app freeze.
        // endEditing(true) resigns WKContentView from the first-responder chain before
        // UITextView shows its keyboard, so WKContentView stays silent during editing.
        webView?.endEditing(true)

        let editorVC = NativeTextEditorVC(text: text, placeholder: placeholder) { [weak self] finalText in
            guard let self = self else { return }
            guard let jsonData = try? JSONEncoder().encode(finalText),
                  let jsonStr  = String(data: jsonData, encoding: .utf8) else { return }
            self.webView?.evaluateJavaScript(
                "window.nativeTextareaSetValue(\(jsonStr));", completionHandler: nil)
        }

        let nav = UINavigationController(rootViewController: editorVC)
        nav.modalPresentationStyle = .pageSheet
        if #available(iOS 15.0, *) {
            if let sheet = nav.sheetPresentationController {
                sheet.detents = [.large()]
                sheet.prefersGrabberVisible = true
                sheet.prefersScrollingExpandsWhenScrolledToEdge = true
            }
        }
        present(nav, animated: true)
    }

    // ─── 3. Global swizzle: drop WKDeferringGestureRecognizer on ANY UIView ──
    //
    // WKDeferringGestureRecognizer is added to WKScrollView (a subview of
    // WKWebView), not to WKWebView itself. Overriding addGestureRecognizer
    // in a WKWebView subclass misses subviews. The global UIView swizzle
    // intercepts ALL addGestureRecognizer: calls regardless of target view.
    private static var deferGRPrevented = false

    private static func preventDeferringGestureRecognizers() {
        guard !deferGRPrevented else { return }
        deferGRPrevented = true

        let sel = #selector(UIView.addGestureRecognizer(_:))
        guard let method = class_getInstanceMethod(UIView.self, sel) else { return }
        let originalIMP = method_getImplementation(method)

        let block: @convention(block) (UIView, UIGestureRecognizer) -> Void = { view, recognizer in
            let typeName = String(describing: type(of: recognizer))
            if typeName.contains("Defer") {
                print("⚡ [Swizzle] dropped \(typeName) on \(type(of: view))")
                return
            }
            typealias Fn = @convention(c) (UIView, Selector, UIGestureRecognizer) -> Void
            unsafeBitCast(originalIMP, to: Fn.self)(view, sel, recognizer)
        }
        method_setImplementation(method, imp_implementationWithBlock(block))
        print("⚡ [Swizzle] UIView.addGestureRecognizer: swizzled")
    }

    // ─── 4. Block focusItemsInRect: on device (prevents 1500ms IPC scan) ─────
    private static var focusScanPatched = false

    private static func patchWKWebViewFocusScan() {
        #if targetEnvironment(simulator)
        return
        #else
        guard !focusScanPatched,
              let wkClass = NSClassFromString("WKWebView") else { return }
        focusScanPatched = true
        let sel = NSSelectorFromString("focusItemsInRect:")
        guard let method = class_getInstanceMethod(wkClass, sel) else { return }
        let stub: @convention(block) (AnyObject, CGRect) -> NSArray = { _, _ in NSArray() }
        method_setImplementation(method, imp_implementationWithBlock(stub))
        print("⚡ [Patch] focusItemsInRect: stubbed")
        #endif
    }
}

// ─── WKWebView subclass: secondary Defer guard for the WKWebView itself ──────
//
// Belt-and-suspenders with the global swizzle. Also ensures that the
// post-creation userContentController.add() call doesn't reinstall Defer
// recognizers on the WKWebView itself (subviews are covered by the swizzle).
private final class NoGateWebView: WKWebView {
    override func addGestureRecognizer(_ gestureRecognizer: UIGestureRecognizer) {
        let name = String(describing: type(of: gestureRecognizer))
        if name.contains("Defer") {
            print("⚡ [NoGate] dropped \(name) on WKWebView")
            return
        }
        super.addGestureRecognizer(gestureRecognizer)
    }
}

// ─── Native text editor sheet ─────────────────────────────────────────────────

private final class NativeTextEditorVC: UIViewController, UITextViewDelegate {

    private let textView         = UITextView()
    private let placeholderLabel = UILabel()
    private let completion: (String) -> Void

    init(text: String, placeholder: String, completion: @escaping (String) -> Void) {
        self.completion = completion
        super.init(nibName: nil, bundle: nil)
        textView.text         = text
        placeholderLabel.text = placeholder
    }

    required init?(coder: NSCoder) { fatalError() }

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .systemBackground

        navigationItem.leftBarButtonItem = UIBarButtonItem(
            title: "Отмена", style: .plain, target: self, action: #selector(cancelTapped))
        navigationItem.rightBarButtonItem = UIBarButtonItem(
            title: "Готово", style: .done, target: self, action: #selector(doneTapped))

        textView.font                   = .systemFont(ofSize: 17)
        textView.textContainerInset     = UIEdgeInsets(top: 14, left: 10, bottom: 14, right: 10)
        textView.autocorrectionType     = .default
        textView.autocapitalizationType = .sentences
        textView.spellCheckingType      = .no
        textView.delegate               = self
        textView.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(textView)

        placeholderLabel.font          = .systemFont(ofSize: 17)
        placeholderLabel.textColor     = .placeholderText
        placeholderLabel.numberOfLines = 0
        placeholderLabel.isHidden      = !textView.text.isEmpty
        placeholderLabel.translatesAutoresizingMaskIntoConstraints = false
        textView.addSubview(placeholderLabel)

        NSLayoutConstraint.activate([
            textView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
            textView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            textView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            textView.bottomAnchor.constraint(equalTo: view.bottomAnchor),

            placeholderLabel.topAnchor.constraint(equalTo: textView.topAnchor, constant: 20),
            placeholderLabel.leadingAnchor.constraint(equalTo: textView.leadingAnchor, constant: 15),
            placeholderLabel.trailingAnchor.constraint(equalTo: textView.trailingAnchor, constant: -15),
        ])

        NotificationCenter.default.addObserver(
            self, selector: #selector(keyboardFrameChanged(_:)),
            name: UIResponder.keyboardWillChangeFrameNotification, object: nil)
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        textView.becomeFirstResponder()
        if !textView.text.isEmpty {
            let end = NSRange(location: textView.text.count, length: 0)
            textView.scrollRangeToVisible(end)
        }
    }

    @objc private func keyboardFrameChanged(_ notification: Notification) {
        guard let frame = notification.userInfo?[UIResponder.keyboardFrameEndUserInfoKey] as? CGRect else { return }
        let inset = max(0, view.bounds.maxY - view.convert(frame, from: nil).minY)
        textView.contentInset.bottom                  = inset
        textView.verticalScrollIndicatorInsets.bottom = inset
    }

    func textViewDidChange(_ textView: UITextView) {
        placeholderLabel.isHidden = !textView.text.isEmpty
    }

    @objc private func doneTapped() {
        completion(textView.text)
        dismiss(animated: true)
    }

    @objc private func cancelTapped() {
        dismiss(animated: true)
    }
}
