import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
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
import { Skeleton } from 'moti/skeleton';

export default function MovieList({
  title,
  data,
  hideSeeAll = false,
  onPagging = null,
  isLoading = false,
}) {
  const navigation = useNavigation();
  const [page, setPage] = useState(1);

  useEffect(() => {
    console.log('USE EFFECT', page);
    if (onPagging) onPagging(page);
  }, [page]);

  return (
    <View className="mb-8 spacey-4">
      {/* Headline */}
      <View className="mx-4 mb-4 flex-row justify-between items-center">
        <Skeleton show={isLoading}>
          <Text className="text-white text-xl">{title}</Text>
        </Skeleton>
        {!hideSeeAll && (
          <Skeleton show={isLoading}>
            <TouchableOpacity>
              <Text className="text-lg text-yellow-400">See All</Text>
            </TouchableOpacity>
          </Skeleton>
        )}
      </View>

      {isLoading ? (
        <MovieListSkeleton />
      ) : (
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
                  <Skeleton show={isLoading}>
                    <Image
                      source={{ uri: image185(item.poster_path) }}
                      className="rounded-3xl"
                      style={{ width: width * 0.33, height: height * 0.22 }}
                    />
                  </Skeleton>

                  {!isLoading && (
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
                  )}
                </View>
              </TouchableWithoutFeedback>
            );
          }}
          keyExtractor={(item, index) => index}
          onEndReachedThreshold={0.2}
          onEndReached={() => setPage(page + 1)}
        />
      )}
    </View>
  );
}

function MovieListSkeleton() {
  const numberOfItems = 3;

  return (
    <ScrollView horizontal contentContainerStyle={{ paddingLeft: 15 }}>
      {Array.from({ length: numberOfItems }).map((_, index) => (
        <View className="mr-4" key={index}>
          <Skeleton width={width * 0.33} height={height * 0.22} radius={24} />
        </View>
      ))}
    </ScrollView>
  );
}
