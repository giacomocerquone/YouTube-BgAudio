import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Slider from '@react-native-community/slider';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import Play from '../icons/Play';
import Pause from '../icons/Pause';
import {unit} from '../constants';

const Player = ({togglePlay, isPlaying}) => {
  const progress = useProgress();

  return (
    <View>
      <Slider
        style={styles.progressContainer}
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
    height: 40,
    width: 380,
    marginTop: 25,
    flexDirection: 'row',
  },
  buttonsContainer: {
    marginTop: unit * 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
