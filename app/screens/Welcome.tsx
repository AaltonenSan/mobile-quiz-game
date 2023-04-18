import React, { useState } from "react";
import { Button } from "@rneui/themed";
import { StatusBar, StyleSheet, Image, View } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import { AuthStackScreenProps } from "../types/NavigationTypes";
import { MenuButtonStyle, MenuButtonTitleStyle } from "../theme/theme";

export default function Welcome({ navigation, route }: AuthStackScreenProps<'Welcome'>) {
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
          buttonStyle={MenuButtonStyle}
          titleStyle={MenuButtonTitleStyle}
          title='Login'
          onPress={() => navigation.navigate('Login')}
        />
        <Button
          buttonStyle={MenuButtonStyle}
          titleStyle={MenuButtonTitleStyle}
          title='Sign Up'
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>
      <Button
        buttonStyle={MenuButtonStyle}
        titleStyle={MenuButtonTitleStyle}
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
        onDismiss={() => setShowAlert(false)}
        onCancelPressed={() => setShowAlert(false)}
        onConfirmPressed={() => startQuickGame()}
        confirmButtonColor={MenuButtonStyle.backgroundColor}
        confirmButtonTextStyle={MenuButtonTitleStyle}
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
  }
})