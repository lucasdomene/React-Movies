import React, { useState } from 'react';
import { Text, ScrollView, Image } from 'react-native';
import { View } from 'react-native';

import Header from '../components/Header';
import { android, width, height } from '../constants/constants';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';

export default function PersonScreen() {
  const [movies, setMovies] = useState([1, 2, 3, 4, 5]);
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) return <Loading />;

  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <Header />

      {/* Details */}
      <View className={`${android && 'mt-8'}`}>
        <View
          className="flex-row justify-center"
          style={{
            shadowColor: 'gray',
            shadowRadius: 40,
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 1,
          }}
        >
          <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
            <Image
              source={require('../assets/movie-poster.jpg')}
              style={{ height: height * 0.43, width: width * 0.74 }}
            />
          </View>
        </View>

        {/* Name */}
        <View className="mt-6 space-y-1">
          <Text className="text-3xl text-white font-bold text-center">
            Keanu Reeves
          </Text>
          <Text className="text-base text-neutral-500 text-center">
            Beirut, Lebanon
          </Text>
        </View>

        {/* Stats */}
        <View className="mx-3 p-4 mt-6 flex-row justify-between items-center rounded-full bg-neutral-700">
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Gender</Text>
            <Text className="text-neutral-300 text-sm">Male</Text>
          </View>
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Birthday</Text>
            <Text className="text-neutral-300 text-sm">1964-09-02</Text>
          </View>
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Known for</Text>
            <Text className="text-neutral-300 text-sm">Acting</Text>
          </View>
          <View className="border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Popularity</Text>
            <Text className="text-neutral-300 text-sm">64.23</Text>
          </View>
        </View>

        {/* Biography */}
        <View className="my-6 mx-4 space-y-2">
          <Text className="text-white text-lg">Biography</Text>
          <Text className="text-neutral-400 tracking-wide">
            Keanu Charles Reeves is a Canadian actor. Known for his phlegmatic
            disposition in roles spanning numerous genres, he has established
            himself as a leading man in action cinema.
          </Text>
        </View>

        {/* Movie List */}
        <MovieList title="Movies" data={movies} hideSeeAll />
      </View>
    </ScrollView>
  );
}
