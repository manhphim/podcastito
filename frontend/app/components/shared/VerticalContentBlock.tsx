import { View, Text } from '../theme/Themed';
import React from 'react';
import VerticalCardDetailsList from './VerticalCardDetailsList';
import { StyleSheet } from 'react-native';

const VerticalContentBlock = ({ title, data }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <VerticalCardDetailsList data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 320,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  title: {
    fontFamily: 'Inter Bold',
    fontSize: 24,
  },
});

export default VerticalContentBlock;
