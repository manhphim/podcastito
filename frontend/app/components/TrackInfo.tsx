import React from 'react';
import { Image, Text, View } from './theme/Themed';
import { StyleSheet } from 'react-native';
import type { Track } from 'react-native-track-player';
import GlobalStyles from '../constants/GlobalStyles';

export const TrackInfo: React.FC<{
  track?: Track;
}> = ({ track }) => {
  return (
    <View style={styles.container}>
      <Image testID="track-artwork" style={styles.artwork} source={{ uri: track?.artwork }} />
      <Text testID="track-title" style={styles.titleText}>
        {track?.title}
      </Text>
      <Text testID="track-artist" style={styles.artistText}>
        {track?.artist}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  artwork: {
    width: '60%',
    aspectRatio: 1,
    marginTop: '2%',
    backgroundColor: 'grey',
  },
  titleText: {
    marginTop: 30,
    fontSize: 24,
    fontFamily: 'Inter Bold',
    textAlign: 'center',
  },
  artistText: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: '200',
  },
});
