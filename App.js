import React, {useState, useEffect} from 'react';
import {StyleSheet, View, SafeAreaView, Image, StatusBar} from 'react-native';
import ytdl from 'react-native-ytdl';
import useShare from './src/hooks/useShare';
import usePlayer from './src/hooks/usePlayer';
import {unit} from './src/constants';
import Text from './src/components/Text';
import Player from './src/components/Player';
import TrackPlayer from 'react-native-track-player';

const App = () => {
  const {sharedData, sharedExtraData} = useShare();
  const {ready, isPlaying, togglePlay} = usePlayer();
  const [videoData, setVideoData] = useState();

  const thumbUrl =
    videoData?.videoDetails?.thumbnails?.[
      videoData?.videoDetails?.thumbnails?.length - 1
    ]?.url;
  const title = videoData?.videoDetails?.title;
  const uploader = videoData?.videoDetails?.ownerChannelName;

  useEffect(
    function () {
      (async () => {
        if (ready && sharedData) {
          const res = await ytdl.getInfo(sharedData);
          const format = ytdl.chooseFormat(res.formats, {
            quality: 'highestaudio',
            filter: 'audioonly',
          });

          if (format?.url) {
            await TrackPlayer.add({
              title: res?.videoDetails?.title,
              artist: res?.videoDetails?.ownerChannelName,
              url: format.url,
            });
          }

          console.log('RES', res);
          console.log('FORMAT', format);
          setVideoData(res);
        }
      })();
    },
    [ready, sharedData, title, uploader],
  );

  console.log('shared data', sharedData);
  console.log(
    'Extra data',
    sharedExtraData ? JSON.stringify(sharedExtraData) : '',
  );

  if (!ready) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#091227" barStyle="light-content" />
      {videoData ? (
        <>
          <View style={{width: '100%'}}>
            <Text style={styles.appTitle}>YTAudio</Text>
            <Image source={{uri: thumbUrl}} style={styles.thumbnail} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.uploader}>{uploader}</Text>
          </View>

          <Player isPlaying={isPlaying} togglePlay={togglePlay} />
        </>
      ) : (
        <Text style={styles.title}>Condividi un video youtube qui</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#091227',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: unit * 4,
    justifyContent: 'space-between',
    paddingVertical: unit * 10,
  },
  appTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28,
    marginBottom: unit * 16,
  },
  thumbnail: {width: '100%', height: 260},
  title: {
    marginTop: unit * 10,
    marginBottom: unit * 2,
    textAlign: 'center',
  },
  uploader: {
    textAlign: 'center',
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#A5C0FF',
    marginBottom: unit * 12,
  },
});

export default App;
