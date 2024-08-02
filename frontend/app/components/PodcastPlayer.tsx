import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from './theme/Themed';
import { Spacer } from './Spacer';
import { Progress } from './Progress';
import { PlayerControls } from './PlayerControls';
import { TrackInfo } from './TrackInfo';
import { StatusBar } from 'react-native';
import TrackPlayer from 'react-native-track-player';
type Props = {
  track: any;
  activeTrack: any;
};

const PodcastPlayer = (props: Props) => {
  useEffect(() => {
    TrackPlayer.reset().then(() => {
      TrackPlayer.add(props.track).then(() => {
        TrackPlayer.play();
      });
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <TrackInfo track={props.track} />
      <Progress live={props.activeTrack?.isLiveStream} />
      <PlayerControls />
      <Spacer mode={'expand'} />
    </SafeAreaView>
  );
};

export default PodcastPlayer;

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
