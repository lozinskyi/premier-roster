import { Team } from '@/src/api/generated';
import { EmptyState, LoadingSpinner, SearchBar, SectionHeader, TeamCard } from '@/src/components';
import { PREMIER_LEAGUE_ID, SEASON_2022_ID } from '@/src/constants';
import { useTeams } from '@/src/hooks/useTeams';
import { MaterialIcons } from '@expo/vector-icons';
import { Box, Divider, VStack } from '@gluestack-ui/themed';
import { Stack, useRouter } from 'expo-router';
import { FC, useCallback, useMemo } from 'react';
import { FlatList, StatusBar, StyleSheet } from 'react-native';

const Teams: FC = () => {
  const router = useRouter();

  const {
    teams,
    isLoading,
    searchText,
    setSearchText,
  } = useTeams(PREMIER_LEAGUE_ID, SEASON_2022_ID);

  const handleTeamPress = useCallback((team: Team) => {
    router.push(`/team?teamId=${team.id}&teamName=${team.name}&league=${PREMIER_LEAGUE_ID}&season=${SEASON_2022_ID}`);
  }, [router]);

  const renderTeam = useCallback(({ item }: { item: Team }) => (
    <TeamCard team={item} onPress={handleTeamPress} />
  ), [handleTeamPress]);

  const ListHeader = useMemo(() => (
    <VStack space="md" px="$4" pt="$4">
      <SectionHeader 
        title="Teams" 
        subtitle="English Premier League" 
        count={teams?.length || 0} 
      />
      <SearchBar 
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search teams..."
      />
      <Divider bg="$borderDark800" mt="$2" />
    </VStack>
  ), [teams?.length, searchText, setSearchText]);

  const EmptyListComponent = useMemo(() => (
    <EmptyState 
      message="No teams available" 
      icon={<MaterialIcons name="sports-soccer" size={48} color="#a0a0a0" />} 
    />
  ), []);

  const keyExtractor = useCallback((item: Team) => item.id.toString(), []);

  return (
    <Box flex={1} bg="$backgroundDark900">
      <StatusBar barStyle="light-content" />
      <Stack.Screen 
        options={{ 
          title: 'Premier League Teams',
          headerStyle: {
            backgroundColor: '#121212',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />
      
      {isLoading ? (
        <LoadingSpinner message="Loading teams..." />
      ) : (
        <VStack flex={1} bg="$backgroundDark900">
          {ListHeader}
          <FlatList
            data={teams}
            keyExtractor={keyExtractor}
            renderItem={renderTeam}
            style={styles.list}
            contentContainerStyle={styles.listContentContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={EmptyListComponent}
          />
        </VStack>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContentContainer: {
    padding: 16,
  },
});

export default Teams;
