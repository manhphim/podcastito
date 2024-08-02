import { ImageSourcePropType } from 'react-native';

export type Podcast = {
  id: number;
  title: string;
  author: string;
  image: { uri: string } | ImageSourcePropType;
};
