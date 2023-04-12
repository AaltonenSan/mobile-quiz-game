import React from 'react';
import { useAuthentication } from '../utils/useAuthentication';
import UserStack from './userStack';
import AuthStack from './authStack';
import HomeStack from './homeStack';

export default function RootNavigation() {
  const { user } = useAuthentication();

  return user ? <HomeStack /> : <AuthStack />;
}