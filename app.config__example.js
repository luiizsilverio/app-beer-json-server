export default {
  name: 'my-app-beer',
  // version: '1.3.0',
  icon: "./assets/android-icon.png",
  "splash": {
    "image": "./assets/android_splash.png",
    "resizeMode": "contain",
    "backgroundColor": "#232129"
  },
  extra: {
    // api_host: '192.168.1.40',
    api_host: '192.168.1.200',
    api_port: '3434',
    api_secret: 'XXX',
    api_key_dato: 'XXX'
  },
  "android": {
    "package": "com.luiizsilverio.myappbeer",
    "versionCode": 3,
    "permissions": [],
    "adaptiveIcon": {
      "foregroundImage": "./assets/android-icon.png",
      "backgroundColor": "#232129"
    }
  }
};

// Renomeie este arquivo para app.config.js e informe os dados acima