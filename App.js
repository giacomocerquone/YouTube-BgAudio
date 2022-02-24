import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import ytdl from 'react-native-ytdl';
import useIsPlaying from './src/hooks/useIsPlaying';
import useShare from './src/hooks/useShare';
import TrackPlayer from 'react-native-track-player';
import usePlayer from './src/hooks/usePlayer';

const App = () => {
  const {sharedData, sharedExtraData} = useShare();
  const {isPlaying} = useIsPlaying();
  const {ready} = usePlayer();
  const [url, setUrl] = useState();

  useEffect(
    function () {
      (async () => {
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

  const onPress = async () => {
    console.log('pressing');
    try {
      if (isPlaying) {
        await TrackPlayer.pause();
      } else {
        if (url) {
          await TrackPlayer.play();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

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
      <Button title={isPlaying ? 'Pause' : 'Play'} onPress={onPress} />
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
