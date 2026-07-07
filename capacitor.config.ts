const config = {
  appId: "com.coachspace.app",
  appName: "Coach Space",
  webDir: "dist",
  ios: {
    scrollEnabled: true,
    allowsLinkPreview: false,
  },
  plugins: {
    Keyboard: {
      resize: "native",
      resizeOnFullScreen: true,
      autoBackdropColor: "auto",
    },
  },
};

export default config;
