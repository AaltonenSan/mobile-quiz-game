import { ActivityIndicator, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { Button, Card, Icon, Input } from "@rneui/themed";
import { getAuth, signOut } from "firebase/auth";
import { UserTabScreenProps } from "../types/NavigationTypes";
import { MenuButtonStyle, MenuButtonTitleStyle } from "../theme/theme";
import { useEffect, useState } from "react";
import { createUser, getChallengesPassed, getUserInformation } from "../utils/firestore";
import { auth } from "../config/firebase";

export default function Profile({ navigation, route }: UserTabScreenProps<'Profile'>) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [challenges, setChallenges] = useState<number>(0)
  const [editActive, setEditActive] = useState(false)
  const [newUsername, setNewUsername] = useState('')

  const loadUserInformation = async () => {
    try {
      const user = await getUserInformation(auth.currentUser.uid)
      setUsername(user.username)
      const challenges = await getChallengesPassed(user.username)
      setChallenges(challenges)
      setEmail(user.email)
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditUsername = async () => {
    try {
      await createUser(newUsername, auth.currentUser.uid, email)
      await loadUserInformation()
      setEditActive(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadUserInformation()
  }, [])

  return (
    <View style={styles.contentView}>
      <Card containerStyle={{ width: 250, borderRadius: 10 }}>
        <Card.Title>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Icon style={{ marginRight: 10 }} name="person" />
            <Text>Username</Text>
          </View>
        </Card.Title>
        <Card.Divider />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>{username}</Text>
          <ActivityIndicator size='small' animating={username === ''} />
          <Text onPress={() => setEditActive(true)}>Edit</Text>
        </View>
      </Card>
      <Card containerStyle={{ width: 250, borderRadius: 10 }}>
        <Card.Title>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Icon style={{ marginRight: 10 }} name="email" />
            <Text>Email</Text>
          </View>
        </Card.Title>
        <Card.Divider />
        {email === '' ? (
          <ActivityIndicator size='small' />
        ) : (
          <Text>{email}</Text>
        )}
      </Card>
      <Card containerStyle={{ width: 250, borderRadius: 10, paddingBottom: 0 }}>
        <Card.Title>
          <Text>Challenges passed: {challenges}</Text>
        </Card.Title>
      </Card>
      <Button
        title='Sign Out'
        buttonStyle={MenuButtonStyle}
        titleStyle={MenuButtonTitleStyle}
        onPress={() => signOut(auth)}
      />
      <Modal
        visible={editActive}
        transparent
        animationType='slide'
        onRequestClose={() => setEditActive(false)}
      >
        <View style={styles.modal}>
          <Text style={{ fontSize: 20, marginBottom: 15 }}>Change username</Text>
          <Text style={{ fontSize: 12, color: 'red', marginBottom: 5 }}>Progress will be lost when updating username!</Text>
          <TextInput
            style={{ width: 200, height: 40, borderWidth: 1, borderRadius: 5, padding: 10 }}
            onChangeText={(text) => setNewUsername(text)}
            value={newUsername}
            placeholder='New username'
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <Button
              title='Cancel'
              onPress={() => setEditActive(false)}
              buttonStyle={styles.editButtons}
              titleStyle={MenuButtonTitleStyle}
            />
            <Button
              title='Save'
              onPress={() => handleEditUsername()}
              buttonStyle={styles.editButtons}
              titleStyle={MenuButtonTitleStyle}
            />
          </View>
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
    backgroundColor: '#0F3057',
  },
  title: {
    color: 'white',
    fontSize: 24,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    maxHeight: 320,
    marginTop: '50%',
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 10
  },
  editButtons: {
    backgroundColor: '#FFA500',
    marginVertical: 10,
    borderRadius: 15,
    width: 100,
    margin: 5
  }
})