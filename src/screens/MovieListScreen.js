import { useRoute } from '@react-navigation/native';
import React from 'react';
import { FlatList } from 'react-native';
import MovieItem from '../components/MovieItem';

export default function MovieListScreen() {
  const {
    params: { data },
  } = useRoute();

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
        return <MovieItem item={item} />;
      }}
    />
  );
}
