import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { RootStackParamList } from '../../types';
import HomeScreen from '../screens/HomeScreen';
import PodcastDetailsScreen from '../screens/PodcastDetailsScreen';
import EpisodePlayerScreen from '../screens/EpisodePlayerScreen';
import PodcastDetailsListScreen from '../screens/PodcastDetailsListScreen';
import CategoryDetailsScreen from '../screens/CategoryDetailsScreen';
import CategoryDetailsListScreen from '../screens/CategoryDetailsListScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="PodcastDetails" component={PodcastDetailsScreen} />
      <Stack.Screen name="PodcastDetailsList" component={PodcastDetailsListScreen} />
      <Stack.Screen name="EpisodePlayer" component={EpisodePlayerScreen} />
      <Stack.Screen name="CategoryDetails" component={CategoryDetailsScreen} />
      <Stack.Screen name="CategoryDetailsList" component={CategoryDetailsListScreen} />
    </Stack.Navigator>
  );
};

export default RootStack;
