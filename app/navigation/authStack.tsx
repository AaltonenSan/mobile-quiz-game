import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Quiz from '../screens/Quiz';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Welcome" component={Welcome} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="Sign Up" component={SignUp} />
        <Stack.Screen options={{ headerShown: false }} name='Quiz' component={Quiz} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}