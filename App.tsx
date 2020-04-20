import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFirebaseFCMService } from "./customHook"

export default function App() {
  const { loader, fcmToken } = useFirebaseFCMService();
  console.log({ fcmToken })
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
