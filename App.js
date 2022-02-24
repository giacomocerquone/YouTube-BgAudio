import React, {useEffect, useState} from 'react';
import TrackPlayer, {Capability} from 'react-native-track-player';
import App2 from './App2';

const App = () => {
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

  if (!ready) {
    return null;
  }

  return <App2 />;
};

export default App;
