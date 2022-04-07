import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Slider from '@react-native-community/slider';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import Play from '../icons/Play';
import Pause from '../icons/Pause';
import {unit} from '../constants';
import Text from './Text';

const Player = ({togglePlay, isPlaying}) => {
  const progress = useProgress();

  return (
    <View>
      <View style={styles.progressContainer}>
        <Text style={styles.progressCounter}>
          {new Date(progress.position * 1000).toISOString().substr(14, 5)}
        </Text>
        <Text style={styles.progressCounter}>
          {new Date((progress.duration - progress.position) * 1000)
            .toISOString()
            .substr(14, 5)}
        </Text>
      </View>

      <Slider
        style={styles.slider}
        value={progress.position}
        minimumValue={0}
        maximumValue={progress.duration}
        thumbTintColor="#FFFFFF"
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#FFFFFF"
        onSlidingComplete={async value => {
          await TrackPlayer.seekTo(value);
        }}
      />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={togglePlay}>
          {isPlaying ? <Pause /> : <Play />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Player;

const styles = StyleSheet.create({
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: unit * 6,
  },
  slider: {
    height: 40,
    width: 380,
    flexDirection: 'row',
  },
  buttonsContainer: {
    marginTop: unit * 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  progressCounter: {color: '#A5C0FF', fontSize: 14},
});
