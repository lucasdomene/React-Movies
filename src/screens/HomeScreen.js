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
import { iOS } from '../constants/constants';
import {
  fetchTrendingMovies,
  fetchUpcomingMovies,
  fetchTopRatedMovies,
} from '../api/MovieDB';

import { RefreshControl } from 'react-native';

export default function HomeScreen() {
  const navigation = useNavigation();

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [isTrendingLoading, setIsTrendingLoading] = useState(true);
  const [isUpcomingLoading, setIsUpcomingLoading] = useState(true);
  const [isTopRatedLoading, setIsTopRatedLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies(1);
    getTopRatedMovies(1);
  }, []);

  function refresh() {
    setIsRefreshing(true);

    setIsTrendingLoading(true);
    setIsUpcomingLoading(true);
    setIsTopRatedLoading(true);

    setTrendingMovies([]);
    setUpcomingMovies([]);
    setIsTopRatedLoading([]);

    getTrendingMovies();
    getUpcomingMovies(1);
    getTopRatedMovies(1);
  }

  async function getTrendingMovies() {
    const data = await fetchTrendingMovies();

    if (data && data.results) {
      setTrendingMovies(data.results);
    }

    setIsTrendingLoading(false);
    setIsRefreshing(false);
  }

  async function getUpcomingMovies(page) {
    const data = await fetchUpcomingMovies(page);

    if (data && data.results) {
      setUpcomingMovies((previous) => [...previous, ...data.results]);
    }

    setIsUpcomingLoading(false);
  }

  async function getTopRatedMovies(page) {
    const data = await fetchTopRatedMovies(page);

    if (data && data.results) {
      setTopRatedMovies((previous) => [...previous, ...data.results]);
    }

    setIsTopRatedLoading(false);
  }

  const Header = () => (
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
  );

  return (
    <ScrollView
      className="flex-1 bg-neutral-800"
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={refresh}
          colors={['white']}
          tintColor="white"
        />
      }
    >
      {/* Navigation Bar */}
      <Header />

      <ScrollView>
        {/* Trending Movies Carousel */}
        <TrendingMovies data={trendingMovies} isLoading={isTrendingLoading} />

        {/* Upcoming Movies */}
        <MovieList
          title="Upcoming"
          data={upcomingMovies}
          onPagging={getUpcomingMovies}
          isLoading={isUpcomingLoading}
          isRefreshing={isRefreshing}
        />

        {/* Top Rated Movies */}
        <MovieList
          title="Top Rated"
          data={topRatedMovies}
          onPagging={getTopRatedMovies}
          isLoading={isTopRatedLoading}
          isRefreshing={isRefreshing}
        />
      </ScrollView>
    </ScrollView>
  );
}
