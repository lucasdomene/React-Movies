import React from 'react';
import { View, Text } from 'react-native';
import { width, height } from '../constants/constants';

export default function Loading() {
  return (
    <View
      className="absolute flex-row justify-center items-center"
      style={{ width, height }}
    >
      <Text>Loading</Text>
    </View>
  );
}
