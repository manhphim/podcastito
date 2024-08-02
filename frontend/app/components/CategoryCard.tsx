import { Card } from '@ui-kitten/components';
import { Pressable } from 'react-native';
import { Image, Text, View } from './theme/Themed';
import React, { useEffect } from 'react';
import { ImageSourcePropType, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Category, Podcast } from '../model';
import { validImage } from '../utils/getImage';

interface CategoryCardProps {
  data: any;
}

const categoryImage = require('../assets/images/default-category.png');

const CategoryCard = ({ data }: CategoryCardProps) => {
  const navigation = useNavigation();

  const { name, id }: Category = data.item;
  const navigateDetails = () => {
    navigation.navigate('CategoryDetails', {
      category: data.item,
    });
  };

  return (
    <Pressable style={styles.container} onPress={navigateDetails}>
      <Image source={categoryImage} style={styles.image} />
      <Text style={styles.title}>{name}</Text>
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
    backgroundColor: 'transparent',
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
export default CategoryCard;
