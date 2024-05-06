import React, { useState } from 'react';
import { Animated } from 'react-native';

export function FadeInImage({ uri, style }) {
  const [opacity, setOpacity] = useState(new Animated.Value(0));

  function onLoad() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Animated.Image
      source={{ uri }}
      style={[style, { opacity }]}
      onLoad={onLoad}
    />
  );
}
