import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'
import Home from '../screens/Home';
import Profile from '../screens/Profile'
import HighScores from '../screens/HighScores';

const Tab = createBottomTabNavigator()

export default function UserStack() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === 'Home') {
            iconName = 'md-home'
          } else if (route.name === 'Highscores') {
            iconName = 'md-list'
          } else if (route.name === 'Profile') {
            iconName = 'md-person'
          }
          return <Ionicons name={iconName} size={size} color={color} />
        }
      }
      )}>
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Highscores' component={HighScores} />
      <Tab.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
  );
}