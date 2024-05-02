import { View, ScrollView, TouchableOpacity, Image, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/solid';
import { LinearGradient } from 'expo-linear-gradient';

import Header from '../components/Header';
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import { width, height } from '../constants/constants';
import { FlatListComponent } from 'react-native';
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchMovieRecommendations,
  image500,
} from '../api/MovieDB';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export default function MovieScreen() {
  const { params: item } = useRoute();

  const [details, setDetails] = useState({});
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const releaseYear = new Date(item.release_date).getFullYear();

  useEffect(() => {
    getMovieDetails();
    getMovieCredits();
    getSimilarMovies();
  }, [item]);

  async function getMovieDetails() {
    const data = await fetchMovieDetails(item.id);
    setDetails(data);
    setIsLoading(false);
  }

  async function getMovieCredits() {
    const data = await fetchMovieCredits(item.id);
    setCast(data.cast);
  }

  async function getSimilarMovies() {
    const data = await fetchMovieRecommendations(item.id);
    setSimilarMovies(data.results);
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
          <Text className="text-white text-center text-3xl font-bold tracking-wider mx-3">
            {item.title}
          </Text>

          {/* Status */}
          <Text className="text-neutral-400 font-semibold text-base text-center">
            {details.status} • {releaseYear} • {details.runtime} min
          </Text>

          {/* Genres */}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 12,
              gap: 10,
              justifyContent: 'center',
              flexGrow: 1,
            }}
          >
            {details.genres.map((genre) => (
              <View
                key={genre.id}
                className="bg-yellow-400 px-3 py-1 rounded-full"
              >
                <Text className="text-black text-center font-semibold text-base">
                  {genre.name}
                </Text>
              </View>
            ))}
          </ScrollView>

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
