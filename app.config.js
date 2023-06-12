import { config } from 'dotenv'

config()

export default {
  expo: {
    scheme: 'com.ejekanshjain.pocket-settle',
    name: 'pocket-settle',
    slug: 'pocket-settle',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'dark',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#000000'
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#000000'
      }
    },
    android: {
      package: 'com.ejekanshjain.pocket-settle',
      versionCode: 1
    },
    extra: {
      firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID
      },
      eas: {
        projectId: process.env.EAS_PROJECT_ID
      }
    }
  }
}
