import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';

import MovieCard from './MovieCard';
import { width } from '../constants/constants';
import { Skeleton } from 'moti/skeleton';
import { MotiView } from 'moti';

const Spacer = ({ width = 16 }) => <MotiView style={{ width }} />;

export default function TrendingMovies({ data, isLoading }) {
  const navigation = useNavigation();
  const skeletonData = [{}, {}, {}];

  function onPress(item) {
    navigation.navigate('Movie', item);
  }

  return (
    <View className="mb-8">
      <View className="text-white text-xl mx-4 mb-5">
        <Skeleton width={100} show={isLoading}>
          <Text className="text-white text-xl">Trending</Text>
        </Skeleton>
      </View>

      <Carousel
        data={isLoading ? skeletonData : data}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        renderItem={({ item }) => (
          <Skeleton show={isLoading} radius={24}>
            <MovieCard item={item} onPress={() => onPress(item)} />
          </Skeleton>
        )}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: 'flex', alignItems: 'center' }}
      />
    </View>
  );
}