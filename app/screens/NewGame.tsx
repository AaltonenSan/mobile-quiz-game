import { useEffect, useState } from "react";
import { View } from "react-native";
import { OpenTDBResponse, Result } from "../types/OpenTDBTypes";

export default function NewGame() {
  const [options, setOptions] = useState({})
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
    <View>

    </View>
  )
}