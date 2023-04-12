import { Button, Input } from "@rneui/themed";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth()

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const signUp = async () => {
    if (email === '' || password === '') {
      setMsg('Email and password are needed')
      return
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      navigation.navigate('Login')
    } catch (error) {
      setMsg(error.message)
    }
  }

  return (
    <View>
      <Text>Signup Page</Text>

      {msg && <Text>{msg}</Text>}
      <View>
        <Input
          placeholder='email'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder='password'
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button title='Sign Up' onPress={signUp} />
      </View>
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