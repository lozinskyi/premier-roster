import { TeamsScreen } from '@/src/screens';
import { Stack } from 'expo-router';
import { FC } from 'react';
import { StyleSheet } from 'react-native';

const Teams: FC = () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Premier League Teams',
          headerStyle: styles.headerStyle,
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <TeamsScreen />
    </>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#121212',
  },
});

export default Teams;
