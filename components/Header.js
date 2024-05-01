import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

export default function Header({ overlap = false }) {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <SafeAreaView
      className={`${
        overlap && 'absolute'
      } z-20 w-full flex-row justify-between items-center px-4 mt-2`}
    >
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
  );
}
