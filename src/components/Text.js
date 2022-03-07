import {StyleSheet, Text as RNText} from 'react-native';
import React from 'react';

const Text = ({children, style}) => {
  return <RNText style={[styles.text, style]}>{children}</RNText>;
};

export default Text;

const styles = StyleSheet.create({
  text: {
    color: '#EAF0FF',
    fontSize: 24,
  },
});
