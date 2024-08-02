import TrackPlayer, { AppKilledPlaybackBehavior, Capability, RepeatMode } from 'react-native-track-player';

export const DefaultRepeatMode = RepeatMode.Queue;
export const DefaultAudioServiceBehaviour = AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification;

const setupPlayer = async (options: Parameters<typeof TrackPlayer.setupPlayer>[0]) => {
  const setup = async () => {
    try {
      await TrackPlayer.setupPlayer(options);
    } catch (error) {
      console.log('setupPlayer error', error);
      return (error as Error & { code?: string }).code;
    }
  };
  const status = await setup();
  if (status !== 'android_cannot_setup_player_in_background') return;

  console.log('setupPlayer status', status);
  while ((await setup()) === 'android_cannot_setup_player_in_background') {
    // A timeout will mostly only execute when the app is in the foreground,
    // and even if we were in the background still, it will reject the promise
    // and we'll try again:
    await new Promise<void>((resolve) => setTimeout(resolve, 1));
  }
};

export const SetupService = async () => {
  try {
    await setupPlayer({
      autoHandleInterruptions: true,
    });
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior: DefaultAudioServiceBehaviour,
      },
      // This flag is now deprecated. Please use the above to define playback mode.
      // stoppingAppPausesPlayback: true,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext],
      progressUpdateEventInterval: 2,
    });
    await TrackPlayer.setRepeatMode(DefaultRepeatMode);
  } catch (error) {
    console.error(error);
  }
};
