import React from 'react';
import { View, Text, Dimensions } from 'react-native';

import Carousel from 'react-native-snap-carousel';
import MovieCard from './MovieCard';
import { useNavigation } from '@react-navigation/native';

var { width } = Dimensions.get('window');

export default function TrendingMovies({ data }) {
  const navigation = useNavigation();

  function onPress() {
    navigation.navigate('Movie', item);
  }

  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
      <Carousel
        data={data}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        renderItem={({ item }) => <MovieCard item={item} onPress={onPress} />}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: 'flex', alignItems: 'center' }}
      />
    </View>
  );
}
