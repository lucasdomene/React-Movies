import { Dimensions, Platform } from 'react-native';

// Platform
export const iOS = Platform.OS === 'ios';
export const android = Platform.OS === 'android';

// Dimensions
export const { width, height } = Dimensions.get('window');
