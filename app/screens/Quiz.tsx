import { useEffect, useState } from "react";
import { decode } from "html-entities"; // used to decode html encoded responses from opentdb
import { View, StyleSheet } from "react-native";
import { OpenTDBResponse, Result } from "../types/OpenTDBTypes";
import Question from "../components/Question";

export default function Quiz() {
  const [questions, setQuestions] = useState<Result[]>([])

  const fetchQuestions = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=10')
      const data: OpenTDBResponse = await response.json()
      setQuestions(data.results)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  return (
    <View style={styles.container}>
      <Question />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F3057'
  }
})