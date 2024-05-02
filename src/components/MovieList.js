import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  FlatList,
} from 'react-native';

import { width, height } from '../constants/constants';
import { image185 } from '../api/MovieDB';

export default function MovieList({
  title,
  data,
  hideSeeAll = false,
  onPagging = null,
}) {
  const navigation = useNavigation();
  const [page, setPage] = useState(1);

  function handlePagging() {
    if (onPagging) {
      setPage((previous) => {
        onPagging(previous + 1);
        return previous + 1;
      });
    }
  }

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

      <FlatList
        horizontal
        data={data}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 15 }}
        renderItem={({ item }) => {
          return (
            <TouchableWithoutFeedback
              onPress={() => navigation.push('Movie', item)}
            >
              <View className="space-y-2 mr-4">
                <Image
                  source={{ uri: image185(item.poster_path) }}
                  className="rounded-3xl"
                  style={{ width: width * 0.33, height: height * 0.22 }}
                />
                <Text
                  className="text-neutral-300 ml-1 text-center"
                  style={{
                    width: width * 0.3,
                  }}
                  numberOfLines={3}
                  ellipsizeMode="tail"
                >
                  {item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        }}
        keyExtractor={(item, index) => index}
        onEndReachedThreshold={0.2}
        onEndReached={handlePagging}
      />
    </View>
  );
}
