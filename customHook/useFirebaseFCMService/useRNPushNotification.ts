import { useState } from 'react'
import PushNotification from 'react-native-push-notification';

export type TOnNotificationResponse = {
    foreground: boolean;
    userInteraction: boolean;
    message: string | object;
    data: object;
    subText?: string;
    badge: number;
    alert: object;
    sound: string;
    finish: (fetchResult: string) => void;
}

export default function useRNPushNotification(): { rnPushNotification: TOnNotificationResponse, runPushNotification: (title: string, message: string) => void } {
    const [rnPushNotification, setRnPushNotification] = useState<TOnNotificationResponse>()
    PushNotification.configure({
        onNotification: function (notification: TOnNotificationResponse) {
            setRnPushNotification(notification)
        },
        senderID: '1098972549052',
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },
        popInitialNotification: true,
        requestPermissions: true,
    });

    function runPushNotification(title: string, message: string) {
        PushNotification.localNotification({
            autoCancel: true,
            largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
            smallIcon: 'notification_icon', // (optional) default: "ic_notification" with fallback for "ic_launcher"
            vibrate: true, // (optional) default: true
            vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
            title, // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
            message, // (required)
            soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
            ongoing: false,
            number: '1',
            priority: "high",
        });
    }

    return {
        rnPushNotification,
        runPushNotification
    }
}
