import {useState, useEffect, useCallback} from 'react';
import TrackPlayer, {
  Capability,
  useTrackPlayerEvents,
  Event,
  State,
} from 'react-native-track-player';

const usePlayer = () => {
  const [ready, setReady] = useState(false);
  const [playerState, setPlayerState] = useState(null);

  const events = [Event.PlaybackState, Event.PlaybackError];

  useTrackPlayerEvents(events, event => {
    if (event.type === Event.PlaybackError) {
      console.warn('An error occured while playing the current track.');
    }
    if (event.type === Event.PlaybackState) {
      setPlayerState(event.state);
    }
  });

  useEffect(() => {
    (async () => {
      await TrackPlayer.setupPlayer({});
      await TrackPlayer.updateOptions({
        stopWithApp: false,
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
        compactCapabilities: [Capability.Play, Capability.Pause],
      });

      setReady(true);
    })();
  }, []);

  const isPlaying = playerState === State.Playing;

  const togglePlay = useCallback(async () => {
    try {
      if (isPlaying) {
        await TrackPlayer.pause();
      } else {
        await TrackPlayer.play();
      }
    } catch (e) {
      throw e;
    }
  }, [isPlaying]);

  return {ready, togglePlay, isPlaying};
};

export default usePlayer;
