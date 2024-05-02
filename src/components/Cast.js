import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { image185 } from '../api/MovieDB';

export default function Cast({ cast }) {
  const navigation = useNavigation();

  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 15 }}
        data={cast}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              className="mr-4 items-center"
              onPress={() => navigation.navigate('Person', item)}
            >
              <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
                <Image
                  className="rounded-2xl h-24 w-20"
                  source={{ uri: image185(item.profile_path) }}
                />
              </View>
              <Text
                className="text-white text-xs text-center mt-2 w-20"
                numberOfLines={3}
              >
                {item.character}
              </Text>
              <Text
                className="text-neutral-400 text-xs text-center mt-1 w-20"
                numberOfLines={3}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
