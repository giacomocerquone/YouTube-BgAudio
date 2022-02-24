import TrackPlayer, {
  useTrackPlayerEvents,
  TrackPlayerEvents,
  STATE_PLAYING,
} from 'react-native-track-player';
import {useEffect, useState} from 'react';

// Subscribing to the following events inside MyComponent
const events = [
  TrackPlayerEvents.PLAYBACK_STATE,
  TrackPlayerEvents.PLAYBACK_ERROR,
];

const usePlayer = () => {
  const [ready, setReady] = useState(false);
  const [playerState, setPlayerState] = useState(null);

  useEffect(() => {
    (async () => {
      await TrackPlayer.setupPlayer({});
      setReady(true);
    })();
  }, []);

  useTrackPlayerEvents(events, event => {
    if (event.type === TrackPlayerEvents.PLAYBACK_ERROR) {
      console.warn('An error occured while playing the current track.');
    }
    if (event.type === TrackPlayerEvents.PLAYBACK_STATE) {
      setPlayerState(event.state);
    }
  });

  const isPlaying = playerState === STATE_PLAYING;

  return {isPlaying, ready};
};

export default usePlayer;
