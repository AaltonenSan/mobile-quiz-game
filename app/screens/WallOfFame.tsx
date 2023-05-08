import { ListItem } from "@rneui/themed";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { WallOfFameInterface } from "../types/FirebaseTypes";
import { UserTabScreenProps } from "../types/NavigationTypes";
import { getWallOfFamers } from "../utils/firestore";

export default function WallOfFame({ navigation, route }: UserTabScreenProps<'WallOfFame'>) {
  const [users, setUsers] = useState<WallOfFameInterface[]>([])

  useEffect(() => {
    (async () => {
      try {
        const response = await getWallOfFamers()
        setUsers(response)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>These players have passed</Text>
      <Text style={styles.title}>The Challenge!</Text>
      <ActivityIndicator size='large' animating={!users.length} />
      <FlatList
        data={users}
        contentContainerStyle={{ marginTop: 20, marginHorizontal: 20 }}
        renderItem={({ item }) => (
          <ListItem topDivider>
            <ListItem.Content>
              <ListItem.Title>{item.username} {item.date}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F3057',
    textAlign: 'center',
    paddingTop: 30
  },
  title: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center'
  }
})