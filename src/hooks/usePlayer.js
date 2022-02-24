import {useTrackPlayerEvents, Event, State} from 'react-native-track-player';
import {useState} from 'react';

const usePlayer = () => {
  const events = [Event.PlaybackState, Event.PlaybackError];

  const [playerState, setPlayerState] = useState(null);

  useTrackPlayerEvents(events, event => {
    if (event.type === Event.PlaybackError) {
      console.warn('An error occured while playing the current track.');
    }
    if (event.type === Event.PlaybackState) {
      setPlayerState(event.state);
    }
  });

  const isPlaying = playerState === State.Playing;

  return {isPlaying};
};

export default usePlayer;
