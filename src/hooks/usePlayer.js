import {useState, useEffect} from 'react';
import TrackPlayer, {Capability} from 'react-native-track-player';

const usePlayer = () => {
  const [ready, setReady] = useState(false);

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

  return {ready};
};

export default usePlayer;
