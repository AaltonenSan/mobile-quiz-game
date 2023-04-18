import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Result } from "../types/OpenTDBTypes";
import { QuizScreenProps } from "../types/NavigationTypes";
import Question from "../components/Question";

const testQuestions: Result[] = [
  {
    "category": "Science: Mathematics",
    "type": "multiple",
    "difficulty": "medium",
    "question": "In the hexadecimal system, what number comes after 9?",
    "correct_answer": "The Letter A",
    "incorrect_answers": [
      "10",
      "The Number 0",
      "16"
    ]
  },
  {
    "category": "Science: Mathematics",
    "type": "multiple",
    "difficulty": "medium",
    "question": "What is the area of a circle with a diameter of 20 inches if &pi;= 3.1415?",
    "correct_answer": "314.15 Inches",
    "incorrect_answers": [
      "380.1215 Inches",
      "3141.5 Inches",
      "1256.6 Inches"
    ]
  },
  {
    "category": "Science: Mathematics",
    "type": "multiple",
    "difficulty": "medium",
    "question": "Which greek mathematician ran through the streets of Syracuse naked while shouting &quot;Eureka&quot; after discovering the principle of displacement?",
    "correct_answer": "Archimedes",
    "incorrect_answers": [
      "Euclid",
      "Homer",
      "Eratosthenes"
    ]
  },
]

export default function Quiz({ navigation, route }: QuizScreenProps<'Quiz'>) {
  const [questions, setQuestions] = useState<Result[]>(testQuestions)

  return (
    <View style={styles.container}>
      <Question data={questions[1]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F3057'
  }
})