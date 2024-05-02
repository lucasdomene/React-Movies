import { Dimensions, Platform } from 'react-native';

// Platform
export const iOS = Platform.OS === 'ios';
export const android = Platform.OS === 'android';

// Dimensions
export const { width, height } = Dimensions.get('window');

// API
export const API_KEY = 'd34a8f4810509c701b686909f33d15e2';
