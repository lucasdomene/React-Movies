import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';

import TrendingMovies from '../components/TrendingMovies';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import { iOS } from '../constants/constants';
import { fetchTrendingMovies } from '../api/MovieDB';

export default function HomeScreen() {
  const navigation = useNavigation();

  const [trendingMovies, setTrendingMovies] = useState([1, 2, 3]);
  const [upcomingMovies, setUpcomingMovies] = useState([1, 2, 3]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTrendingMovies();
  }, []);

  async function getTrendingMovies() {
    const data = await fetchTrendingMovies();

    if (data && data.results) setTrendingMovies(data.results);
    setIsLoading(false);
  }

  if (isLoading) return <Loading />;

  return (
    <View className="flex-1 bg-neutral-800">
      {/* Navigation Bar */}
      <SafeAreaView className={iOS ? '-mb-2 mt-2' : 'mb-3 mt-2'}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white" />
          <Text className="text-white text-3xl font-bold">
            <Text className="text-yellow-400">M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView>
        {/* Trending Movies Carousel */}
        <TrendingMovies data={trendingMovies} />

        {/* Upcoming Movies */}
        <MovieList title="Upcoming" data={upcomingMovies} />

        {/* Top Rated Movies */}
        <MovieList title="Top Rated" data={upcomingMovies} />
      </ScrollView>
    </View>
  );
}
