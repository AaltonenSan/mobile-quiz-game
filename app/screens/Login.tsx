import { useState } from "react";
import { Button } from "@rneui/themed";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { getAuth, reload, sendPasswordResetEmail, signInWithEmailAndPassword, updateCurrentUser } from "firebase/auth";
import AwesomeAlert from "react-native-awesome-alerts";
import { AuthStackScreenProps } from "../types/NavigationTypes";
import { MenuButtonTitleStyle, MenuButtonStyle } from "../theme/theme";

const auth = getAuth()
const actionCodeSettings = {
  url: 'https://www.example.com/?email=user@example.com',
  iOS: {
    bundleId: 'com.example.ios'
  },
  android: {
    packageName: 'com.example.android',
    installApp: true,
    minimumVersion: '12'
  },
  handleCodeInApp: true
}

export default function Login({ navigation, route }: AuthStackScreenProps<'Login'>) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [message, setMessage] = useState('')

  const login = async () => {
    if (email === '' || password === '') {
      setMessage('Email and password \n are required!')
      setShowAlert(true)
      return
    }

    try {
      await signInWithEmailAndPassword(auth, email, password)
      await reload(auth.currentUser)
      if (!auth.currentUser.emailVerified) {
        setMessage('Please verify your email to continue')
        setShowAlert(true)
      }
    } catch (error) {
      console.log(error)
      setMessage('Wrong credentials!')
      setShowAlert(true)
      setPassword('')
    }
  }

  const resetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email, actionCodeSettings)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          cursorColor='#FFA500'
          placeholder='Email'
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          secureTextEntry={true}
          cursorColor='#FFA500'
          placeholder='Password'
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.buttonView}>
        <Button
          buttonStyle={MenuButtonStyle}
          titleStyle={MenuButtonTitleStyle}
          title='Login'
          onPress={login}
        />
        <Text
          style={{ color: 'white' }}
          onPress={() => resetPassword()}
        >
          Forgot password?
        </Text>
      </View>
      <AwesomeAlert
        show={showAlert}
        title={message}
        titleStyle={{ textAlign: 'center' }}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        onDismiss={() => setShowAlert(false)}
        onConfirmPressed={() => setShowAlert(false)}
        showConfirmButton={true}
        confirmText='Close'
        confirmButtonColor='#FFA500'
        confirmButtonTextStyle={{ color: '#424242' }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F3057',
  },
  inputView: {
    marginTop: 150,
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonView: {
    alignItems: 'center'
  },
  input: {
    width: 250,
    marginVertical: 10,
    borderRadius: 15,
    borderWidth: 4,
    borderColor: '#FFA500',
    backgroundColor: 'white',
    padding: 10,
  }
})