import { config } from "@gluestack-ui/config";
import { Box, GluestackUIProvider } from "@gluestack-ui/themed";
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

// Create custom dark theme config
const darkConfig = {
  ...config,
  tokens: {
    ...config.tokens,
    colors: {
      ...config.tokens.colors,
      // Enhanced dark theme colors
      primary500: "$purple500",
      primary600: "$purple600",
      primary700: "$purple700",
      secondary500: "$amber500",
      secondary600: "$amber600",
      secondary700: "$amber700",
    }
  }
};

export default function RootLayout() {
  return (
    <GluestackUIProvider config={darkConfig}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <Box flex={1} bg="$backgroundDark900">
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#121212',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            contentStyle: {
              backgroundColor: '$backgroundDark900',
            }
          }}
        />
      </Box>
    </GluestackUIProvider>
  );
}
