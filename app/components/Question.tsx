import { Button } from "@rneui/base";
import { useMemo, useState } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { Result } from "../types/OpenTDBTypes";
import { decode } from "html-entities"; // used to decode html encoded responses from opentdb

interface ProgressSquareProps {
  result?: boolean;
}

interface QuestionProps {
  data: Result;
  questionNum: number;
  setQuestionNum: (questionNum: number) => void;
  score: number;
  setScore: (score: any) => void;
  squares: ProgressSquareProps[];
  setSquares: (squares: ProgressSquareProps[]) => void;
  quizType: string;
  showAlert: () => void;
}

export default function Question({ data, questionNum, setQuestionNum, score, setScore, squares, setSquares, quizType, showAlert }: QuestionProps) {
  const answers = useMemo(() => shuffle([data.correct_answer, ...data.incorrect_answers]), [data.correct_answer, data.incorrect_answers])
  const [selected, setSelected] = useState<number | null>(null)

  function shuffle(answerList: string[]) {
    if (!selected) {
      for (let i = answerList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answerList[i], answerList[j]] = [answerList[j], answerList[i]];
      }
      return answerList
    }
  }

  const handlePress = (answer: string, idx: number) => {
    const result = answer === data.correct_answer

    if (!selected) {
      setSelected(idx)
    }

    setScore(result ? score + 1 : score)
    setSquares(squares.map((square, idx) => {
      if (idx === questionNum) {
        return { ...square, result }
      } else {
        return square
      }
    }))

    if (quizType === 'challenge' && !result) {
      showAlert()
      return
    } else {
      setTimeout(() => {
        setQuestionNum(questionNum + 1)
        setSelected(null)
      }, 2000)
    }

  }

  const checkAnswer = (answer: string, idx: number): ViewStyle => {
    const isCorrect = answer === data.correct_answer
    const isSelected = idx === selected

    return ({
      backgroundColor:
        isSelected
          ? isCorrect
            ? '#00ff44' /* selected answer is correct */
            : '#f21f1f' /* selected answer is incorrect */
          : isCorrect
            ? '#00ff44' /* not selected but this is the correct answer */
            : '#FFA500' /* not selected and not correct */
      ,
      borderRadius: 15,
    })
  }

  return (
    <View style={styles.contentContainer}>
      <View style={styles.questionView}>
        <Text style={styles.question}>{decode(data.question)}</Text>
      </View>
      <View style={styles.buttons}>
        {answers.map((answer, idx) => {
          return (
            <Button
              title={decode(answer)}
              key={idx}
              color={'#FFA500'}
              titleStyle={styles.buttonTitle}
              containerStyle={styles.button}
              onPress={() => handlePress(answer, idx)}
              disabled={selected !== null}
              disabledStyle={checkAnswer(answer, idx)}
              disabledTitleStyle={styles.buttonTitle}
            />)
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  questionView: {
    flex: 1,
    marginBottom: 300,
    justifyContent: 'flex-end'
  },
  question: {
    color: 'white',
    fontSize: 24,
    marginHorizontal: 20,
    padding: 20,
  },
  button: {
    width: 250,
    marginTop: 15,
    maxHeight: 40,
    borderRadius: 15,
  },
  buttons: {
    position: 'absolute',
    bottom: 50,
  },
  buttonTitle: {
    color: '#424242'
  },
})