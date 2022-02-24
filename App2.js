import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import ytdl from 'react-native-ytdl';
import usePlayer from './src/hooks/usePlayer';
import useShare from './src/hooks/useShare';
import TrackPlayer from 'react-native-track-player';

const URL = 'https://www.youtube.com/watch?v=04GiqLjRO3A';

const App = () => {
  const {sharedMimeType, sharedData, sharedExtraData} = useShare();
  const {isPlaying, ready} = usePlayer();
  const [url, setUrl] = useState();

  useEffect(function () {
    (async () => {
      // todo should use shareddata
      const downloadableURLs = await ytdl(URL, {quality: 'highestaudio'});

      setUrl(downloadableURLs?.[0]?.url);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (url) {
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
        await TrackPlayer.play();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>React Native Share Menu</Text>
      <Text style={styles.instructions}>Shared type: {sharedMimeType}</Text>
      <Text style={styles.instructions}>
        Shared text: {sharedMimeType === 'text/plain' ? sharedData : ''}
      </Text>
      <Text style={styles.instructions}>Shared image:</Text>
      {sharedMimeType.startsWith('image/') && (
        <Image
          style={styles.image}
          source={{uri: sharedData}}
          resizeMode="contain"
        />
      )}
      <Text style={styles.instructions}>
        Shared file:{' '}
        {sharedMimeType !== 'text/plain' && !sharedMimeType.startsWith('image/')
          ? sharedData
          : ''}
      </Text>
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
