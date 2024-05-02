import React from 'react';
import { View, Text } from 'react-native';
import { width, height } from '../constants/constants';
import * as Progress from 'react-native-progress';

export default function Loading() {
  return (
    <View
      className="absolute flex-row justify-center items-center bg-neutral-800"
      style={{ width, height }}
    >
      <Progress.CircleSnail thickness={12} size={90} color="#facc15" />
    </View>
  );
}
