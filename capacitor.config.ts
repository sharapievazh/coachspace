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
      resize: "body",
      resizeOnFullScreen: true,
    },
  },
};

export default config;
