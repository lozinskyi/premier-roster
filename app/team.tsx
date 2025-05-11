import { TeamScreen } from '@/src/screens';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

const Team: React.FC = () => {
  const { teamName } = useLocalSearchParams<{
    teamName: string;
  }>();

  return (
    <>
      <Stack.Screen
        options={{
          title: teamName,
          headerStyle: styles.headerStyle,
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <TeamScreen />
    </>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#121212',
  },
});

export default Team;
