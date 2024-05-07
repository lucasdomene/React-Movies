import React from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { image342 } from '../api/MovieDB';
import { height, width } from '../constants/constants';
import { useNavigation } from '@react-navigation/native';

export default function MovieItem({ item }) {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={() => navigation.push('Movie', item)}>
      <View className="space-y-2 mb-4">
        <Image
          className="rounded-3xl"
          source={{ uri: image342(item.poster_path) }}
          style={{ width: width * 0.44, height: height * 0.3 }}
        />
        <Text
          className="text-neutral-300 ml-1 text-center"
          style={{ width: width * 0.44 }}
          numberOfLines={3}
        >
          {item.title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
