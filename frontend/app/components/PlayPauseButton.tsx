import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import TrackPlayer, { useIsPlaying } from 'react-native-track-player';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import CustomActivityIndicator from './shared/ActivityIndicator';

export const PlayPauseButton: React.FC = () => {
  const { playing, bufferingDuringPlay } = useIsPlaying();

  return (
    <>
      {bufferingDuringPlay ? (
        <CustomActivityIndicator />
      ) : (
        <TouchableOpacity style={styles.container} onPress={playing ? TrackPlayer.pause : TrackPlayer.play}>
          <Ionicons name={playing ? 'pause' : 'play'} size={24} color={'white'} />
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 100,
  },
});
