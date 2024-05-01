import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React, { useState } from 'react';

import { height, width } from '../constants/constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';

export default function SearchScreen() {
  const navigation = useNavigation();
  const [results, setResults] = useState([1, 2, 3]);

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      {/* Search Bar */}
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
          placeholder="Search Movie"
          placeholderTextColor={'lightgray'}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size={25} color="white" />
        </TouchableOpacity>
      </View>

      {/* Results */}
      <ScrollView
        className="space-y-3"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        <Text className="text-white font-semibold ml-1">
          Results ({results.length})
        </Text>
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
                    source={require('../assets/movie-poster.jpg')}
                    style={{ width: width * 0.44, height: height * 0.3 }}
                  />
                  <Text className="text-neutral-300 ml-1">Outsider</Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
