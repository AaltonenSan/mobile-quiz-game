import React, { useState } from "react";
import { Button } from "@rneui/themed";
import { StatusBar, StyleSheet, Image, View } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";

export default function Welcome({ navigation }) {
  const [showAlert, setShowAlert] = useState(false)

  const startQuickGame = () => {
    setShowAlert(false)
    navigation.navigate('Quiz')
  }

  return (
    <View style={styles.contentView}>
      <StatusBar />
      <Image source={require('../assets/owl.png')} style={{ width: 200, height: 200 }} />
      <View style={styles.buttons}>
        <Button
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          title='Login'
          onPress={() => navigation.navigate('Login')}
        />
        <Button
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          title='Sign Up'
          onPress={() => navigation.navigate('Sign Up')}
        />
      </View>
      <Button
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitle}
        title='Quick Quiz'
        onPress={() => setShowAlert(true)}
      />

      <AwesomeAlert
        show={showAlert}
        title={'Continue without \n creating an account?'}
        titleStyle={{ textAlign: 'center' }}
        message="You won't have access to certain features like the leaderboard!"
        messageStyle={{ textAlign: 'center' }}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showCancelButton={true}
        showConfirmButton={true}
        confirmText="Let's go!"
        onCancelPressed={() => setShowAlert(false)}
        onConfirmPressed={() => startQuickGame()}
        confirmButtonColor='#FFA500'
        confirmButtonTextStyle={{ color: '#424242' }}
        cancelButtonColor='#424242'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  contentView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F3057'
  },
  buttons: {
    marginVertical: 50
  },
  button: {
    backgroundColor: '#FFA500',
    marginVertical: 10,
    borderRadius: 15,
    width: 200
  },
  buttonTitle: {
    color: '#424242'
  },
  quickGameButton: {
    backgroundColor: '#00C853',
    marginVertical: 10,
    borderRadius: 15,
    width: 200
  }
})