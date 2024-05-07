import React, { useEffect, useState } from 'react';
import { Text, ScrollView, Image } from 'react-native';
import { View } from 'react-native';

import Header from '../components/Header';
import { android, width, height } from '../constants/constants';
import MovieList from '../components/MovieList';
import Loading from '../components/Loading';
import { useRoute } from '@react-navigation/native';
import {
  fetchPersonDetails,
  fetchPersonMovieCredits,
  image500,
} from '../api/MovieDB';

export default function PersonScreen() {
  const { params: item } = useRoute();

  const [movies, setMovies] = useState([]);
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isMovieLoading, setIsMovieLoading] = useState(true);

  function formattedDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  const gender =
    item.gender === 1
      ? 'Female'
      : item.gender === 2
      ? 'Male'
      : item.gender === 3
      ? 'Non-binary'
      : 'Unspecified';

  useEffect(() => {
    getDetails();
    getMovies();
  }, [item]);

  async function getDetails() {
    const details = await fetchPersonDetails(item.id);
    setDetails(details);
    setIsLoading(false);
  }

  async function getMovies() {
    const data = await fetchPersonMovieCredits(item.id);
    setMovies(data.cast);
    setIsMovieLoading(false);
  }

  const ProfileImage = () => (
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
          source={{ uri: image500(item.profile_path) }}
          style={{ height: height * 0.43, width: width * 0.74 }}
        />
      </View>
    </View>
  );

  const Headline = () => (
    <View className="mt-6 space-y-1">
      <Text className="text-3xl text-white font-bold text-center">
        {item.name}
      </Text>
      <Text className="text-base text-neutral-500 text-center">
        {details.place_of_birth}
      </Text>
    </View>
  );

  const Stats = () => (
    <View className="mx-3 p-4 mt-6 flex-row justify-between items-center rounded-full bg-neutral-700">
      <View className="border-r-2 border-r-neutral-400 px-2 items-center">
        <Text className="text-white font-semibold">Gender</Text>
        <Text className="text-neutral-300 text-sm">{gender}</Text>
      </View>
      <View className="border-r-2 border-r-neutral-400 px-2 items-center">
        <Text className="text-white font-semibold">Birthday</Text>
        <Text className="text-neutral-300 text-sm">
          {formattedDate(details.birthday)}
        </Text>
      </View>
      <View className="border-r-2 border-r-neutral-400 px-2 items-center">
        <Text className="text-white font-semibold">Known for</Text>
        <Text className="text-neutral-300 text-sm">
          {item.known_for_department}
        </Text>
      </View>
      <View className="border-r-neutral-400 px-2 items-center">
        <Text className="text-white font-semibold">Popularity</Text>
        <Text className="text-neutral-300 text-sm">
          {item.popularity.toFixed(2)}%
        </Text>
      </View>
    </View>
  );

  if (isLoading) return <Loading />;

  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <Header />

      {/* Details */}
      <View className={`${android && 'mt-8'}`}>
        <ProfileImage />

        {/* Name */}
        <Headline />

        {/* Stats */}
        <Stats />

        {/* Biography */}
        <View className="my-6 mx-4 space-y-2">
          <Text className="text-white text-lg">Biography</Text>
          <Text className="text-neutral-400 tracking-wide">
            {details.biography}
          </Text>
        </View>

        {/* Movie List */}
        <MovieList
          title="Movies"
          data={movies}
          isLoading={isMovieLoading}
          hideSeeAll
        />
      </View>
    </ScrollView>
  );
}
