import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { UserTabScreenProps } from "../types/NavigationTypes";
import { useAuthentication } from "../utils/useAuthentication";

export default function Home({ navigation, route }: UserTabScreenProps<'Home'>) {
  const { user } = useAuthentication()

  return (
    <View style={styles.contentView}>
      <Text style={{ color: 'white' }}>Hello {user?.email}!</Text>
      <TouchableOpacity
        style={styles.roundedButton}
        onPress={() => navigation.navigate('Quiz')}
      >
        <Text>New Game</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  contentView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  roundedButton: {
    backgroundColor: 'white',
    height: 150,
    width: 150,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center'
  }
})