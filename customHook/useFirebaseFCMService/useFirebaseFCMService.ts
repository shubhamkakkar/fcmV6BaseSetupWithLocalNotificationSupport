import React, { useState, useEffect } from "react";
import messaging from '@react-native-firebase/messaging';
export default function useFirebaseFCMService() {
    const [loader, setLoader] = useState<boolean>(true)
    const [fcmToken, setFcmToken] = useState<string>("")
    const [remoteMessage, setRemoteMessage] = useState<any>()

    async function registerAppWithFCM() {
        await messaging().registerDeviceForRemoteMessages();
    }
    async function requestUserPermission() {
        const settings = await messaging().requestPermission();

        if (settings) {
            console.log('Permission settings:', settings);
        }
    }

    function onNotificationOpenedApp() {
        messaging().onNotificationOpenedApp(remoteMessage => setRemoteMessage(remoteMessage))
    }

    function getInitialNotification() {
        messaging()
            .getInitialNotification()
            .then(remoteMessage => setRemoteMessage(remoteMessage));
    }

    function getToken() {
        messaging()
            .getToken()
            .then(token => {
                setFcmToken(token);
                setLoader(false)
            });
    }

    function firebaseMessageCalls(): void {
        registerAppWithFCM();
        requestUserPermission();
        getToken();
        onNotificationOpenedApp();
        getInitialNotification();
    }
    useEffect(() => {
        firebaseMessageCalls();
        const unsubscribe = messaging().onMessage(async remoteMessage => {
        });

        return () => {
            messaging().onTokenRefresh(token => {
                setFcmToken(token);
                setLoader(false);
            }),
                unsubscribe
        };
    }, []);

    return {
        loader,
        fcmToken,
        remoteMessage
    }
}
