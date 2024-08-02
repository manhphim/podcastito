/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Podcast, Category } from './app/model';
import { Track } from 'react-native-track-player';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  HomeTab: undefined;
  Profile: undefined;
  PodcastDetails: { item: Podcast };
  PodcastDetailsList: undefined;
  CategoryDetails: { category: Category };
  CategoryDetailsList: undefined;
  Search: undefined;
  SearchResults: undefined;
  Settings: undefined;
  EpisodePlayer: { track: Track };
  Playlist: undefined;
  PlaylistDetails: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;
