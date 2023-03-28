import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './components/Home';
import Profile from './components/Profile'
import HighScores from './components/HighScores';
import Quiz from './components/Quiz';

const Tab = createBottomTabNavigator()


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Highscores' component={HighScores} />
        <Tab.Screen name='Profile' component={Profile} />
        <Tab.Screen name='Quiz' component={Quiz} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}