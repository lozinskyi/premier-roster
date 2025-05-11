// Mock NativeAnimatedHelper and Animated module
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper', () => ({
  __esModule: true,
  default: {
    shouldUseNativeDriver: () => false,
    API: {}
  }
}), { virtual: true });

// Also mock the other possible path for compatibility
jest.mock('react-native/Libraries/Animated/implementations/NativeAnimatedHelper', () => ({
  __esModule: true,
  default: {
    shouldUseNativeDriver: () => false,
    API: {}
  }
}), { virtual: true });

// Mock Expo vector icons
jest.mock('@expo/vector-icons', () => {
  const { View, Text } = require('react-native');
  return {
    Ionicons: function MockIonicons({ 
      name, 
      size, 
      color, 
      ...props 
    }) {
      return (
        <View testID={`mock-icon-${name}`} style={{ width: size, height: size }} {...props}>
          <Text>{name}</Text>
        </View>
      );
    },
    MaterialIcons: function MockMaterialIcons({ 
      name, 
      size, 
      color, 
      ...props 
    }) {
      return (
        <View testID={`mock-icon-${name}`} style={{ width: size, height: size }} {...props}>
          <Text>{name}</Text>
        </View>
      );
    },
  };
});