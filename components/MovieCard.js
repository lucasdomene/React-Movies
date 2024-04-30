import { TouchableWithoutFeedback, Image } from 'react-native';
import React from 'react';

import { width, height } from '../constants/constants';

export default function MovieCard({ item, onPress }) {
  const imageWidth = width * 0.6;
  const imageHeight = height * 0.4;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Image
        source={require('../assets/movie-poster.jpg')}
        style={{ width: imageWidth, height: imageHeight }}
        className={`rounded-3xl width-[${imageWidth}] height-[${imageHeight}]`}
      />
    </TouchableWithoutFeedback>
  );
}
