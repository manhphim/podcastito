import { View, Text, TouchableOpacity } from '../theme/Themed';
import React from 'react';
import HorizontalCardList from './HorizontalCardList';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HorizontalContentBlock = ({ title, data, type }: any) => {
  const navigation = useNavigation();

  const navigateDetails = () => {
    if (type === 'podcast') {
      navigation.navigate('PodcastDetailsList');
    } else if (type === 'category') {
      navigation.navigate('CategoryDetailsList');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={navigateDetails}>
          <Text>See more</Text>
        </TouchableOpacity>
      </View>
      <HorizontalCardList data={data} type={type} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    textAlign: 'left',
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Inter Bold',
    fontSize: 24,
  },
});

export default HorizontalContentBlock;
