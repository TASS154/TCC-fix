import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'TCC',
  webDir: 'www',
  server: { url: 'https://localhost:8100', cleartext: true }
};

export default config;
