import { Button } from "@rneui/themed";
import { getAuth, signOut } from "firebase/auth";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { useAuthentication } from "../utils/useAuthentication";

const auth = getAuth()

export default function Home({ navigation }) {
  const { user } = useAuthentication()

  return (
    <View style={styles.contentView}>
      <Text>Hello {user?.email}!</Text>
      <Button
        title='NEW GAME'
        buttonStyle={{
          borderRadius: 30
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10
        }}
        onPress={() => navigation.navigate('Quiz')}
      />
      <Button
        title='LOG OUT'
        buttonStyle={{
          borderRadius: 30
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10
        }}
        onPress={() => signOut(auth)}
      />
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