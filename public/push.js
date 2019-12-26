var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BGwK2GQ7lYqZ-6KyraFHhoB1KIEjyMvIbtBN_MQ2vxZFXRakjv0El5ul3XxwYM5sWebLaVVgBBmMxezup18v5PY",
    "privateKey": "7j7WgE_kI-KPjhvO2ZvlRbC9GTR7BnoxTr471Zl8dQg"
};
 
 
webPush.setVapidDetails(
    'mailto:m.rivai.sali@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/eGwjoKqti2E:APA91bEMxnnaB3-KXN7pKHAjvtIJEEOATfaBap87noee0XSTowT1lgsb_0UtysNdAmvAfo_cfxmCm7dlifIooxqK-xGBkT0o7vo2_WXy3HYJjAbpZ8Rt5j3nJhTWlwxqGrg_K45IAvVR",
    "keys": {
        "p256dh": "BNdyUQ4To1yOTY3H2e4QoMnWVWQcxkkosFc7gTsN/6RXpjHhUBYxKuwHqHC1YRcpC4kJEXwx4Pf/lNKIIA7tRW0=",
        "auth": "sjHvX/vyv+VRpG84HoUvPQ=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
var options = {
    gcmAPIKey: '945485283255',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);