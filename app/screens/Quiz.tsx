import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, BackHandler } from "react-native";
import { OpenTDBResponse, Result } from "../types/OpenTDBTypes";
import { QuizScreenProps } from "../types/NavigationTypes";
import Question from "../components/Question";
import ProgressBar from "../components/ProgressBar";
import AwesomeAlert from "react-native-awesome-alerts";
import { MenuButtonStyle, MenuButtonTitleStyle } from "../theme/theme";
import { useFocusEffect } from "@react-navigation/native";
import { addWallOfFamer } from "../utils/firestore";
import { auth } from "../config/firebase";


interface ProgressSquareProps {
  result?: boolean;
}

export default function Quiz({ navigation, route }: QuizScreenProps<'Quiz'>) {
  const [questions, setQuestions] = useState<Result[]>([])
  const [squares, setSquares] = useState<ProgressSquareProps[]>()
  const [showAlert, setShowAlert] = useState(false)
  const [showExitAlert, setShowExitAlert] = useState(false)
  const [showWinAlert, setShowWinAlert] = useState(false)
  const [score, setScore] = useState(0)
  const [questionNum, setQuestionNum] = useState(0)
  const { logged, category, difficulty, type } = route.params

  const getQuestions = async (category?: number, difficulty?: string) => {
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${category || ''}&difficulty=${difficulty || ''}&type=multiple`)
      const data: OpenTDBResponse = await response.json()
      if (data.response_code === 0) {
        setQuestions(data.results)
      }
    } catch (error) {
      console.log(error)
      if (logged) {
        navigation.navigate("UserTab")
      } else {
        navigation.navigate("Welcome")
      }
    }
  }

  const getChallengeQuestions = async () => {
    const urls = [
      'https://opentdb.com/api.php?amount=3&&difficulty=easy&type=multiple',
      'https://opentdb.com/api.php?amount=3&&difficulty=medium&type=multiple',
      'https://opentdb.com/api.php?amount=4&&difficulty=hard&type=multiple'
    ]

    try {
      const responses = await Promise.all(urls.map(url => fetch(url)))
      const data: OpenTDBResponse[] = await Promise.all(responses.map(response => response.json()))
      const results = data.flatMap(response => response.results)
      setQuestions(results)
    } catch (error) {
      console.log(error)
      if (logged) {
        navigation.navigate("UserTab")
      } else {
        navigation.navigate("Welcome")
      }
    }
  }

  const initializeProgressBar = () => {
    const squareList: ProgressSquareProps[] = []
    for (let i = 0; i < 10; i++) {
      squareList.push({ result: undefined })
    }
    setSquares(squareList)
  }

  // Handle backpress on alert
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        setShowExitAlert(true)
        return true
      }

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      )
      return () => backHandler.remove()
    }, [])
  )

  useEffect(() => {
    if (type === 'challenge') {
      getChallengeQuestions()
    } else {
      getQuestions(category, difficulty)
    }
    initializeProgressBar()
  }, [])

  useEffect(() => {
    (async () => {
      if (questionNum === 10 && type === 'challenge') {
        try {
          await addWallOfFamer(auth.currentUser.uid, new Date().toLocaleDateString())
          setShowWinAlert(true)
        } catch (error) {
          console.log(error)
        }
      } else if (questionNum === 10) {
        setShowAlert(true)
      }
    })()
  }, [questionNum])

  const resetGame = () => {
    setShowAlert(false)
    setQuestions([])
    setScore(0)
    setQuestionNum(0)
    initializeProgressBar()
    getQuestions()
  }

  const endGame = () => {
    setShowAlert(true)
    setShowExitAlert(false)
  }

  const quitGame = () => {
    if (logged) {
      navigation.navigate("UserTab")
    } else {
      navigation.navigate("Welcome")
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ProgressBar squares={squares} score={score} />
      </View>
      {questions.length ? (
        <Question
          data={questions[questionNum < 10 ? questionNum : 9]}
          questionNum={questionNum < 10 ? questionNum : 9}
          setQuestionNum={setQuestionNum}
          score={score}
          setScore={setScore}
          squares={squares}
          setSquares={setSquares}
          quizType={type}
          showAlert={() => setShowAlert(true)}
        />
      ) : (
        <View style={styles.activityIndicator}>
          <ActivityIndicator
            size={"large"}
          />
        </View>
      )}
      <AwesomeAlert
        show={showAlert}
        title={'Game Over'}
        titleStyle={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold' }}
        message={`You got ${score}/10 right!`}
        messageStyle={{ textAlign: 'center', fontSize: 16 }}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        confirmText="Play Again"
        cancelText="Quit"
        onCancelPressed={() => quitGame()}
        onConfirmPressed={() => resetGame()}
        confirmButtonColor={MenuButtonStyle.backgroundColor}
        confirmButtonTextStyle={MenuButtonTitleStyle}
        cancelButtonColor='#424242'
      />
      {/* Triggered if user tries to exit the game with backpress to avoid accidental exit */}
      <AwesomeAlert
        show={showExitAlert}
        title={'Hold on!'}
        titleStyle={{ textAlign: 'center' }}
        message={"Are you sure you want to end the game?"}
        messageStyle={{ textAlign: 'center' }}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showCancelButton={true}
        showConfirmButton={true}
        confirmText="No, continue playing"
        cancelText="Yes"
        onCancelPressed={() => endGame()}
        onConfirmPressed={() => setShowExitAlert(false)}
        confirmButtonColor={MenuButtonStyle.backgroundColor}
        confirmButtonTextStyle={MenuButtonTitleStyle}
        cancelButtonColor='#424242'
      />
      {/* Shown after player gets to the end of challenge mode */}
      <AwesomeAlert
        show={showWinAlert}
        title={'Congratulations!'}
        titleStyle={{ textAlign: 'center' }}
        message={"You passed The Challenge, go check out the Wall of Fame!"}
        messageStyle={{ textAlign: 'center' }}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        confirmText="Wall of Fame"
        cancelText="Home"
        onCancelPressed={() => navigation.navigate('UserTab')}
        onConfirmPressed={() => navigation.navigate('WallOfFame')}
        confirmButtonColor={MenuButtonStyle.backgroundColor}
        confirmButtonTextStyle={MenuButtonTitleStyle}
        cancelButtonColor='#424242'
      />
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0F3057'
  },
  header: {
    alignItems: 'center'
  },
  activityIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})