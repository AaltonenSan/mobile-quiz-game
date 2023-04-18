import { StyleSheet, View } from "react-native";
import { Button } from "@rneui/themed";
import { getAuth, signOut } from "firebase/auth";
import { UserTabScreenProps } from "../types/NavigationTypes";

const auth = getAuth()

export default function Profile({ navigation, route }: UserTabScreenProps<'Profile'>) {
  return (
    <View style={styles.contentView}>
      <Button
        title='LOG OUT'
        buttonStyle={{
          borderRadius: 30
        }}
        containerStyle={{
          width: 250,
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