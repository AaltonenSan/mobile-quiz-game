import React from 'react';
import { useAuthentication } from '../utils/useAuthentication';
import AuthStack from './authStack';
import HomeStack from './homeStack';

export default function RootNavigation() {
  const { user } = useAuthentication();

  // TODO: update user.emailVerified status after verifying it from the link
  return user?.emailVerified ? <HomeStack /> : <AuthStack />;
}