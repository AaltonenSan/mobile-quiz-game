import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'
import Home from '../screens/Home';
import Profile from '../screens/Profile'
import WallOfFame from '../screens/WallOfFame';
import { UserTabParamList } from '../types/NavigationTypes';

const Tab = createBottomTabNavigator<UserTabParamList>()

export default function UserTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === 'Home') {
            iconName = 'md-home'
          } else if (route.name === 'WallOfFame') {
            iconName = 'md-list'
          } else if (route.name === 'Profile') {
            iconName = 'md-person'
          }
          return <Ionicons name={iconName} size={size} color={color} />
        },
      }
      )}>
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='WallOfFame' options={{ title: 'Wall of Fame' }} component={WallOfFame} />
      <Tab.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
  );
}