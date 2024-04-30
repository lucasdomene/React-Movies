import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/solid';
import { LinearGradient } from 'expo-linear-gradient';

import { width, height } from '../constants/constants';

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();

  const [isFavorite, setIsFavorite] = useState(false);

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
      </View>
    </ScrollView>
  );
}
