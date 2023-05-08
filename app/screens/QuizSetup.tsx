import { useFocusEffect } from "@react-navigation/native";
import { Button } from "@rneui/themed";
import { useCallback, useState } from "react";
import { BackHandler } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { MenuButtonStyle, MenuButtonTitleStyle } from "../theme/theme";
import { QuizSetupScreenProps } from "../types/NavigationTypes";
import { categories, difficulties } from "../utils/questionOptions";

export default function QuizSetup({ navigation, route }: QuizSetupScreenProps<'QuizSetup'>) {
  const [questionCategory, setQuestionType] = useState<number>(0)
  const [questionDifficulty, setQuestionDifficulty] = useState('')
  const [typeOpen, setTypeOpen] = useState(false)
  const [difficultyOpen, setDifficultyOpen] = useState(false)
  const difficultyOptions = difficulties
  const categoryOptions = categories

  // Only one dropdown should be open at once
  const onTypeOpen = useCallback(() => {
    setDifficultyOpen(false)
  }, [])
  const onDifficultyOpen = useCallback(() => {
    setTypeOpen(false)
  }, [])

  // Close dropdown on backpress
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        setTypeOpen(false)
        setDifficultyOpen(false)
        return true
      }

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      )
      return () => backHandler.remove()
    }, [])
  )

  const startGame = () => {
    navigation.navigate('Quiz',
      {
        category: questionCategory,
        difficulty: questionDifficulty
      })
  }

  return (
    <View style={styles.container}>
      <View style={styles.select}>
        <Text style={styles.title}>Select category</Text>
        <DropDownPicker
          open={typeOpen}
          listMode="MODAL"
          onOpen={onTypeOpen}
          value={questionCategory}
          items={categoryOptions}
          setOpen={setTypeOpen}
          setValue={setQuestionType}
        />
      </View>
      <View style={[styles.select, { zIndex: 100 }]}>
        <Text style={styles.title}>Select difficulty</Text>
        <DropDownPicker
          open={difficultyOpen}
          onOpen={onDifficultyOpen}
          value={questionDifficulty}
          items={difficultyOptions}
          setOpen={setDifficultyOpen}
          setValue={setQuestionDifficulty}
        />
      </View>
      <Button
        title='Start Quiz'
        buttonStyle={MenuButtonStyle}
        titleStyle={MenuButtonTitleStyle}
        onPress={() => startGame()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F3057',
  },
  select: {
    marginHorizontal: 50,
    marginVertical: 20,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10
  }
})