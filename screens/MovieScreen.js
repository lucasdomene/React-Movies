import { View, ScrollView, TouchableOpacity, Image, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/solid';
import { LinearGradient } from 'expo-linear-gradient';

import Header from '../components/Header';
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import { width, height } from '../constants/constants';
import { FlatListComponent } from 'react-native';
import { fetchMovieCredits, fetchMovieDetails, image500 } from '../api/MovieDB';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();

  const [genres, setGenres] = useState([]);
  const [status, setStatus] = useState('');
  const [runtime, setRuntime] = useState(null);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getMovieDetails();
    getMovieCredits();
  }, [item]);

  async function getMovieDetails() {
    const data = await fetchMovieDetails(item.id);
    setGenres(data.genres.map((genre) => genre.name));
    setStatus(data.status);
    setRuntime(data.runtime);
  }

  async function getMovieCredits() {
    const data = await fetchMovieCredits(item.id);
    console.log(data.cast);
    setCast(data.cast);
  }

  function releaseYear() {
    return new Date(item.release_date).getFullYear();
  }

  if (isLoading) return <Loading />;

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-800"
    >
      <Header overlap />

      <View className="w-full">
        {/* Movie Poster */}
        <View>
          <Image
            source={{ uri: image500(item.poster_path) }}
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
        <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
          {/* Title */}
          <Text className="text-white text-center text-3xl font-bold tracking-wider">
            {item.title}
          </Text>

          {/* Status */}
          <Text className="text-neutral-400 font-semibold text-base text-center">
            {status} • {releaseYear()} • {runtime && runtime} min
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
            {item.overview}
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
