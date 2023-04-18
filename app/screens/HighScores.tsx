import { Text, View } from "react-native";
import { UserTabScreenProps } from "../types/NavigationTypes";

export default function HighScores({ navigation, route }: UserTabScreenProps<'Highscores'>) {
  return (
    <View>
      <Text>
        Hello world!
      </Text>
    </View>
  )
}