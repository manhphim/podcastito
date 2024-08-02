import { StyleSheet } from 'react-native';
import { SafeAreaView, Text, View } from './theme/Themed';
import React from 'react';
import GlobalStyles from '../constants/GlobalStyles';

type TranscriptProps = {
  transcript: string;
};

const Transcript = ({ transcript }: TranscriptProps) => {
  return (
    <View style={styles.container}>
      <Text style={[GlobalStyles.textBold24, GlobalStyles.mB2]}>Transcript</Text>
      <Text>{transcript}</Text>
    </View>
  );
};

export default Transcript;

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
