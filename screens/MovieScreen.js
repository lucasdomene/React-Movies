import { View, ScrollView, TouchableOpacity, Image, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/solid';
import { LinearGradient } from 'expo-linear-gradient';

import Cast from '../components/Cast';
import MovieList from '../components/MovieList';
import { width, height } from '../constants/constants';

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const genres = ['Action', 'Adventure', 'Drama', 'Fantasy'];

  const [isFavorite, setIsFavorite] = useState(false);
  const [cast, setCast] = useState([1, 2, 3, 4, 5]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);

  useEffect(() => {}, [item]);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-800"
    >
      <View className="w-full">
        {/* Header */}
        <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center px-4 mt-2">
          <TouchableOpacity
            className="rounded-xl p-1 bg-yellow-400"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
            <HeartIcon size={35} color={isFavorite ? '#facc15' : 'white'} />
          </TouchableOpacity>
        </SafeAreaView>

        {/* Movie Poster */}
        <View>
          <Image
            source={require('../assets/movie-poster.jpg')}
            style={{ width, height: height * 0.55 }}
          />
          <LinearGradient
            colors={[
              'transparent',
              'rgba(23, 23, 23, 0.8)',
              'rgba(23, 23, 23, 1)',
            ]}
            style={{ width, height: height * 0.4 }}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            className="absolute bottom-0"
          />
        </View>

        {/* Movie Details */}
        <View style={{ marginTop: -(height * 0.09) }} className="space-y-4">
          {/* Title */}
          <Text className="text-white text-center text-3xl font-bold tracking-wider">
            Outsider
          </Text>

          {/* Status */}
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Released • 2020 • 170 min
          </Text>

          {/* Genres */}
          <View className="flex-row justify-center mx-4 space-x-3">
            {genres.map((genre) => (
              <View
                key={genre}
                className="bg-yellow-400 px-3 py-1 rounded-full"
              >
                <Text className="text-black text-center font-semibold text-base">
                  {genre}
                </Text>
              </View>
            ))}
          </View>

          {/* Description */}
          <Text className="text-neutral-400 text-base mx-4 tracking-wide">
            When an insidious supernatural force edges its way into a seemingly
            straightforward investigation into the gruesome murder of a young
            boy, it leads a seasoned cop and an unorthodox investigator to
            question everything they believe in.
          </Text>
        </View>
      </View>

      {/* <Cast /> */}
      <Cast cast={cast} />

      {/* Similar movies */}
      <MovieList title="Similar Movies" data={similarMovies} hideSeeAll />
    </ScrollView>
  );
}
