import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Touchable,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { image342 } from '../api/MovieDB';
import { height, width } from '../constants/constants';

export default function MovieListScreen() {
  const {
    params: { data },
  } = useRoute();
  const navigation = useNavigation();

  console.log(data);

  return (
    <FlatList
      className="bg-neutral-800"
      data={data}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 15 }}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      numColumns={2}
      keyExtractor={(item, index) => index}
      renderItem={({ item }) => {
        return (
          <TouchableWithoutFeedback
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
      }}
    />
  );
}
