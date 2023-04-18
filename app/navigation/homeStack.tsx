import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeStackParamList } from '../types/NavigationTypes';

import Quiz from '../screens/Quiz';
import userTab from './userTab';

const Stack = createStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator>
        <Stack.Screen name="UserTab" component={userTab} options={{ headerShown: false }} />
        <Stack.Screen name="Quiz" component={Quiz} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}