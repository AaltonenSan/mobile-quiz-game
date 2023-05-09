import { useState } from "react";
import { Button } from "@rneui/themed";
import { StyleSheet, TextInput, View } from "react-native";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import AwesomeAlert from "react-native-awesome-alerts";
import { AuthStackScreenProps } from "../types/NavigationTypes";
import { MenuButtonStyle, MenuButtonTitleStyle } from "../theme/theme";
import { createUser } from "../utils/firestore";
import { auth } from "../config/firebase";

export default function SignUp({ navigation, route }: AuthStackScreenProps<'SignUp'>) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [message, setMessage] = useState('')

  const signUp = async () => {
    if (email === '' || password === '') {
      setMessage('Email and password \n are required!')
      setShowAlert(true)
      return
    }

    try {
      const newUser = await createUserWithEmailAndPassword(auth, email, password)
      await sendEmailVerification(auth.currentUser)
      await createUser(username, newUser.user.uid, newUser.user.email)
      setMessage('Check your email for verification link!')
      setShowAlert(true)
    } catch (error) {
      setMessage(error.message)
    }
  }

  const closeAlert = () => {
    setShowAlert(false)
    navigation.navigate('Login')
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
          cursorColor='#FFA500'
          placeholder='Username'
          style={styles.input}
          value={username}
          onChangeText={(text) => setUsername(text)}
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
          title='Sign Up'
          onPress={signUp}
        />
      </View>
      <AwesomeAlert
        show={showAlert}
        title={message}
        titleStyle={{ textAlign: 'center' }}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        onDismiss={() => closeAlert()}
        onConfirmPressed={() => closeAlert()}
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