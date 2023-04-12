import React from "react";
import { Button } from "@rneui/themed";
import { StyleSheet, Text, View } from "react-native";

export default function Welcome({ navigation }) {
  return (
    <View style={styles.contentView}>
      <Text>Welcome!</Text>
      <Button title='Login' onPress={() => navigation.navigate('Login')} />
      <Button title='Sign Up' onPress={() => navigation.navigate('Sign Up')} />
    </View>
  )
}

const styles = StyleSheet.create({
  contentView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})