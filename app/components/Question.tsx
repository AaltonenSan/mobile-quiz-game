import { Button } from "@rneui/base";
import { useMemo, useState } from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { Result } from "../types/OpenTDBTypes";
import { decode } from "html-entities"; // used to decode html encoded responses from opentdb

interface QuestionProps {
  data: Result
}

export default function Question({ data }: QuestionProps) {
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

  const handlePress = (idx: number) => {
    if (!selected) {
      setSelected(idx)
    }
  }

  const checkAnswer = (answer: string, idx: number): ViewStyle => {
    const isCorrect = answer === data.correct_answer
    const isSelected = idx === selected

    return (
      {
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
      }
    )
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
              onPress={() => handlePress(idx)}
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
  question: {
    color: 'white',
    fontSize: 24,
    marginHorizontal: 20,
    padding: 20,
  },
  questionView: {
    flex: 1,
    marginBottom: 300,
    justifyContent: 'flex-end'
  }
})