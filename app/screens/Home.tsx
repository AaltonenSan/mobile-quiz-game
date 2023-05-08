import { Button } from "@rneui/themed";
import { Modal, StyleSheet, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { UserTabScreenProps } from "../types/NavigationTypes";
import { MenuButtonStyle, MenuButtonTitleStyle } from "../theme/theme";
import { useLayoutEffect, useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons'

export default function Home({ navigation, route }: UserTabScreenProps<'Home'>) {
  const [openModal, setOpenModal] = useState(false)

  // Add information icon to navbar to open info modal about game modes
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Ionicons
            name="information-circle"
            size={30}
            color='white'
            style={{ marginRight: 10 }}
            onPress={() => setOpenModal(true)}
          />
        )
      }
    })
  })

  return (
    <View style={styles.contentView}>
      <TouchableOpacity
        style={styles.roundedButton}
        onPress={() => navigation.navigate('Quiz', { logged: true, type: 'challenge' })}
      >
        <Text style={styles.roundedText}>The Challenge</Text>
      </TouchableOpacity>
      <Button
        title='Custom Quiz'
        buttonStyle={MenuButtonStyle}
        titleStyle={MenuButtonTitleStyle}
        onPress={() => navigation.navigate('QuizSetup')}
      />
      <Button
        title='Quick Quiz'
        buttonStyle={MenuButtonStyle}
        titleStyle={MenuButtonTitleStyle}
        onPress={() => navigation.navigate('Quiz')}
      />
      <Modal
        visible={openModal}
        transparent
        animationType='slide'
        onRequestClose={() => setOpenModal(false)}
      >
        <View style={styles.modal}>
          <Text style={{ fontSize: 20, margin: 10, fontWeight: 'bold' }}>Create Quiz</Text>
          <Text style={{ textAlign: 'center' }}>Create a custom quiz. You can choose from different categories and set the difficulty.</Text>
          <Text style={{ fontSize: 20, margin: 10, fontWeight: 'bold' }}>Quick Quiz</Text>
          <Text style={{ textAlign: 'center' }}>Random categories and random difficulties.</Text>
          <Text style={{ fontSize: 20, margin: 10, fontWeight: 'bold' }}>The Challenge</Text>
          <Text style={{ textAlign: 'center' }}>10 questions from random categories getting harded and harder.</Text>
          <Text style={{ textAlign: 'center' }}>Get to the end and join the Wall of Fame!</Text>
          <Button
            title="Close"
            onPress={() => setOpenModal(false)}
            buttonStyle={MenuButtonStyle}
            titleStyle={MenuButtonTitleStyle}
            containerStyle={{ marginTop: 50 }}
          />
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  contentView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F3057'
  },
  roundedButton: {
    backgroundColor: 'white',
    height: 200,
    width: 200,
    borderRadius: 100,
    marginBottom: 30,
    borderColor: '#FFA500',
    borderWidth: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  roundedText: {
    fontSize: 24
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    maxHeight: 400,
    marginTop: '40%',
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 10,
  }
})