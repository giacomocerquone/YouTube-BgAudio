import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import ytdl from 'react-native-ytdl';
import useShare from './src/hooks/useShare';
import TrackPlayer from 'react-native-track-player';
import usePlayer from './src/hooks/usePlayer';
import {YT_URL_TEST} from './src/constants';

const App = () => {
  const {sharedData, sharedExtraData} = useShare();
  const {ready, isPlaying, togglePlay} = usePlayer();
  const [url, setUrl] = useState();

  useEffect(
    function () {
      (async () => {
        const res = await ytdl.getInfo(YT_URL_TEST);

        console.log('RES', res);

        if (sharedData) {
          const downloadableURLs = await ytdl(sharedData, {
            quality: 'highestaudio',
          });

          setUrl(downloadableURLs?.[0]?.url);
        }
      })();
    },
    [sharedData],
  );

  useEffect(() => {
    (async () => {
      if (url && ready) {
        await TrackPlayer.add({title: 'Avaritia', artist: 'deadmau5', url});
      }
    })();
  }, [ready, url]);

  if (!ready) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>YouTube Audio Background</Text>
      <Text style={styles.instructions}>Shared url: {sharedData}</Text>
      <Text style={styles.instructions}>
        Extra data: {sharedExtraData ? JSON.stringify(sharedExtraData) : ''}
      </Text>
      <Button title={isPlaying ? 'Pause' : 'Play'} onPress={togglePlay} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 200,
  },
});

export default App;
