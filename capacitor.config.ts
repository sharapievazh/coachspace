import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sharapieva.coachspace',
  appName: 'CoachSpace',
  webDir: 'dist',
  ios: {
    scrollEnabled: true,
    allowsLinkPreview: false,
  }
};

export default config;
