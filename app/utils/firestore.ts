import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { db } from "../config/firebase";
import { UserData, WallOfFameInterface } from "../types/FirebaseTypes";

export const createUser = async (username: string, id: string, email: string) => {
  try {
    await setDoc(doc(db, 'users', id), {
      email: email,
      username: username
    })
  } catch (error) {
    console.log(error)
  }
}

// return the amount of passed challenges certain user has
export const getChallengesPassed = async (username: string) => {
  const q = query(collection(db, 'fame'), where('username', '==', username))
  const querySnapshot = await getDocs(q)
  const passedChallenges = []
  querySnapshot.forEach((doc) => {
    passedChallenges.push(doc.data())
  })
  return passedChallenges.length
}

// get username and email from firestore
export const getUserInformation = async (uid: string) => {
  const docRef = doc(db, 'users', uid)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return docSnap.data() as UserData
  } else {
    console.log('No user information found!')
  }
}

// add user to walloffame collection
export const addWallOfFamer = async (id: string, date: string) => {
  const user = await getUserInformation(id)
  try {
    await addDoc(collection(db, 'fame'), {
      username: user.username,
      date: date
    })
  } catch (error) {
    console.log(error)
  }
}

// Get the users that have passed the challenge only once to the wall
export const getWallOfFamers = async () => {
  const querySnapshot = await getDocs(collection(db, 'fame'))
  const users: WallOfFameInterface[] = []
  querySnapshot.forEach((doc) => {
    const user = doc.data()
    if (!users.find((item) => item.username === user.username)) {
      users.push(user as WallOfFameInterface)
    }
  })
  return users
}
