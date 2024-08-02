import React from 'react';
import { StyleSheet, View } from 'react-native';
import TrackPlayer, { usePlaybackState } from 'react-native-track-player';
import { Ionicons } from '@expo/vector-icons';
import { PlaybackError } from './PlaybackError';
import { PlayPauseButton } from './PlayPauseButton';
import { TouchableOpacity } from './theme/Themed';

const performSkipToNext = () => TrackPlayer.skipToNext();
const performSkipToPrevious = () => TrackPlayer.skipToPrevious();

export const PlayerControls: React.FC = () => {
  const playback = usePlaybackState();
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity testID="play-back-button" onPress={performSkipToPrevious}>
          <Ionicons name="play-back" size={24} color="black" />
        </TouchableOpacity>
        <PlayPauseButton />
        <TouchableOpacity testID="play-forward-button" onPress={performSkipToNext}>
          <Ionicons name="play-forward" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <PlaybackError error={'error' in playback ? playback.error.message : undefined} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
