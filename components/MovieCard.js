import { TouchableWithoutFeedback, Image } from 'react-native';
import React from 'react';

import { width, height } from '../constants/constants';
import { image500 } from '../api/MovieDB';

export default function MovieCard({ item, onPress }) {
  const imageWidth = width * 0.6;
  const imageHeight = height * 0.4;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Image
        source={{ uri: image500(item.poster_path) }}
        style={{ width: imageWidth, height: imageHeight }}
        className={`rounded-3xl width-[${imageWidth}] height-[${imageHeight}]`}
      />
    </TouchableWithoutFeedback>
  );
}
