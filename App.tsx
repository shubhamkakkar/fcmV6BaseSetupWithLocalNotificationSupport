import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFirebaseFCMService } from "./customHook"

export default function App() {


  const { loader, fcmToken, remoteMessage } = useFirebaseFCMService();

  console.log({ fcmToken, remoteMessage })

  return (
    <View style={styles.container}>
      <Text>
        Firebase Notification pre setup
        </Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})
