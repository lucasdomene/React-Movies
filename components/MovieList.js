import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

import { width, height } from '../constants/constants';

export default function MovieList({ title, data, hideSeeAll = false }) {
  const navigation = useNavigation();

  return (
    <View className="mb-8 spacey-4">
      {/* Headline */}
      <View className="mx-4 mb-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text className="text-lg text-yellow-400">See All</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Moview Row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 15 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push('Movie', item)}
            >
              <View className="space-y-1 mr-4">
                <Image
                  source={require('../assets/movie-poster.jpg')}
                  className="rounded-3xl"
                  style={{ width: width * 0.33, height: height * 0.22 }}
                />
                <Text className="text-neutral-300 ml-1">Outsider</Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
