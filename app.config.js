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
    api_secret: 'b33r@cps',
    api_key_dato: '4370e36968a0493556aabc065d5b68'
  },
  "android": {
    "package": "com.appbeer",
    "versionCode": 4,
    "permissions": [],
    "adaptiveIcon": {
      "foregroundImage": "./assets/android-icon.png",
      "backgroundColor": "#232129"
    }
  }
};
