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

  function onPress(item) {
    navigation.navigate('Movie', item);
  }

  return (
    <View className="mb-8">
      <View className="text-white text-xl mx-4 mb-5">
        <Skeleton width={100} show={true}>
          <Text className="text-white text-xl">Trending</Text>
        </Skeleton>
      </View>

      {true ? (
        <View className="flex flex-row items-center">
          <Skeleton show={true} width={70} height={340} radius={24} />
          <Spacer />
          <Skeleton show={true} width={260} height={380} radius={24} />
          <Spacer />
          <Skeleton show={true} width={70} height={340} radius={24} />
        </View>
      ) : (
        <Carousel
          data={data}
          firstItem={1}
          inactiveSlideOpacity={0.6}
          renderItem={({ item }) => (
            <MovieCard item={item} onPress={() => onPress(item)} />
          )}
          sliderWidth={width}
          itemWidth={width * 0.62}
          slideStyle={{ display: 'flex', alignItems: 'center' }}
        />
      )}
    </View>
  );
}

function TrendingSkeleton() {

}
