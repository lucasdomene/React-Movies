import React from 'react';
import { Text, ScrollView } from 'react-native';
import Header from '../components/Header';

export default function PersonScreen() {
  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <Header />
    </ScrollView>
  );
}
