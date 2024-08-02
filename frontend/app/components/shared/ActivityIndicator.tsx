import { StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from '../theme/Themed';
import React from 'react';
import Colors from '../../constants/Colors';

const CustomActivityIndicator = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </SafeAreaView>
  );
};

export default CustomActivityIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
