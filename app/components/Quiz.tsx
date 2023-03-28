import { useFocusEffect } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function Quiz() {
  const [questions, setQuestions]: any = useState([])

  const getQuestion = async () => {
    try {
      const response = await fetch('http://localhost:8000/questions')
      console.log(response)
      setQuestions(response)
    } catch (exception) {
      console.log(exception)
    }
  }

  useFocusEffect(() => {
    getQuestion()
  })

  return (
    <View>
      <FlatList
        data={questions}
        renderItem={({ item }) => <Text>{item.value}</Text>}
      />
    </View>
  )
}