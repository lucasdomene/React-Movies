import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React, { useCallback, useState } from 'react';

import { height, width } from '../constants/constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { debounce } from 'lodash';
import Loading from '../components/Loading';
import { image342, searchMovies } from '../api/MovieDB';

export default function SearchScreen() {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSearch(value) {
    if (value && value.length > 2) {
      setIsLoading(true);
      const data = await searchMovies({
        query: value,
        include_adult: false,
        languague: 'en-US',
        page: '1',
      });
      setResults(data.results);
      setIsLoading(false);
    }
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 500), []);

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      {/* Search Bar */}
      <View className="mx-4 my-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
          placeholder="Search Movie"
          placeholderTextColor={'lightgray'}
          onChangeText={handleTextDebounce}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size={25} color="white" />
        </TouchableOpacity>
      </View>

      {/* Results */}

      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView
          className="space-y-3"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        >
          {results.length > 0 && (
            <Text className="text-white font-semibold ml-1">
              Results ({results.length})
            </Text>
          )}
          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push('Movie', item)}
                >
                  <View className="space-y-2 mb-4">
                    <Image
                      className="rounded-3xl"
                      source={{ uri: image342(item.poster_path) }}
                      style={{ width: width * 0.44, height: height * 0.3 }}
                    />
                    <Text
                      className="text-neutral-300 ml-1 text-center"
                      style={{ width: width * 0.44 }}
                      numberOfLines={3}
                    >
                      {item.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
