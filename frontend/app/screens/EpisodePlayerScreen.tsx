import { StyleSheet, ActivityIndicator, StatusBar, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import TrackPlayer, { useActiveTrack } from 'react-native-track-player';
import { SafeAreaView, ScrollView, View } from '../components/theme/Themed';
import useSetupPlayer from '../hooks/music-player/useSetupPlayer';
import { Progress } from '../components/Progress';
import { Spacer } from '../components/Spacer';
import { PlayerControls } from '../components/PlayerControls';
import { TrackInfo } from '../components/TrackInfo';
import CustomActivityIndicator from '../components/shared/ActivityIndicator';
import Transcript from '../components/Transcript';
import PodcastPlayer from '../components/PodcastPlayer';

export interface EpisodePlayerScreenProps {
  route: any;
}
const EpisodePlayerScreen = ({ route }: EpisodePlayerScreenProps) => {
  const { track } = route.params;
  const [transcript, setTranscript] = useState<string>('');

  const activeTrack = useActiveTrack();
  const isPlayerReady = useSetupPlayer();

  useEffect(() => {
    if (track.transcriptUrl) {
      fetch(track.transcriptUrl)
        .then((response) => response.text())
        .then((text) => {
          setTranscript(text);
        });
    }
  }, []);

  if (!isPlayerReady) {
    return (
      <SafeAreaView style={styles.screenContainer}>
        <CustomActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <PodcastPlayer track={track} activeTrack={activeTrack} />
        {transcript && <Transcript transcript={transcript} />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EpisodePlayerScreen;

const styles = StyleSheet.create({
  screenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: Dimensions.get('window').height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
