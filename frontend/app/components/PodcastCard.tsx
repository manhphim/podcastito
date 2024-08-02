import { Card } from '@ui-kitten/components';
import { Pressable } from 'react-native';
import { Image, Text, View } from './theme/Themed';
import React, { useEffect } from 'react';
import { ImageSourcePropType, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Podcast } from '../model';
import { validImage } from '../utils/getImage';
interface PodcastCardProps {
  data: any;
}

const PodcastCard = ({ data }: PodcastCardProps) => {
  const navigation = useNavigation();
  const [usedImage, setUsedImage] = React.useState<{ uri: string } | ImageSourcePropType>(
    require('../assets/images/default-podcast.png'),
  );

  const { id, title, author, image }: Podcast = data.item;

  useEffect(() => {
    if (typeof image === 'string') {
      validImage(image).then((image) => {
        setUsedImage(image);
      });
    }
  }, []);

  const navigateDetails = () => {
    navigation.navigate('PodcastDetails', {
      item: { id, title, author, image: usedImage },
    });
  };

  return (
    <Pressable style={styles.container} onPress={navigateDetails}>
      <Image source={usedImage} style={styles.image} />
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
      <Text>{author}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    // add drop shadow for iOS
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  container: {
    alignItems: 'flex-start',
    textAlign: 'left',
    marginVertical: 4,
    marginRight: 10,
    width: 160,
    padding: 16,
  },
  title: {
    fontFamily: 'Inter SemiBold',
    fontSize: 16,
    marginTop: 10,
  },
});

export default PodcastCard;
