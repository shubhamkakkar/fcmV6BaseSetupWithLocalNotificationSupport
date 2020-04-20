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

    async function onNotificationOpenedApp() {
        return await messaging().onNotificationOpenedApp(remoteMessage => remoteMessage)
    }

    async function getInitialNotification() {
        return await messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    return remoteMessage.notification;
                } else {
                    return {}
                }
            });
    }

    function firebaseMessageCalls(): void {
        registerAppWithFCM();
        requestUserPermission();
        messaging()
            .getToken()
            .then(token => {
                setFcmToken(token);
                setLoader(false)
            });
        onNotificationOpenedApp();
        getInitialNotification();
    }

    useEffect(() => {
        firebaseMessageCalls();
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log("Foreground")
        });


        return () => ({
            unsubscribe,
            refreshToken: () => messaging().onTokenRefresh(token => {
                setFcmToken(token);
                setLoader(false);
            })
        })
    }, []);


    return { loader, fcmToken }
}
