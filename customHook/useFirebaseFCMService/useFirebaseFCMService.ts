import React, { useState, useEffect } from "react";
import messaging from '@react-native-firebase/messaging';
export default function useFirebaseFCMService() {
    const [fcmToken, setFcmToken] = useState<string>("")

    async function registerAppWithFCM() {
        await messaging().registerDeviceForRemoteMessages();
    }
    async function requestUserPermission() {
        const settings = await messaging().requestPermission();

        if (settings) {
            console.log('Permission settings:', settings);
        }
    }


    useEffect(() => {

        messaging()
            .getToken()
            .then(token => setFcmToken(token));



        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log("Foreground")
        });

        return unsubscribe;
    }, []);
}
