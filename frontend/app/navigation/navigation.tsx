/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import * as React from 'react';
import { useSelector } from 'react-redux';

import { selectUser } from '../store/authSlice';
import AuthStack from './authStack';
import RootTab from './RootTab';

export default function Navigation() {
  const tokens = useSelector(selectUser);

  return tokens?.accessToken ? <RootTab /> : <AuthStack />;
}
