import { EmptyState, LoadingSpinner, PlayerCard, SectionHeader } from '@/src/components';
import { useTeamPlayers } from '@/src/hooks/useTeamPlayers';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Badge, BadgeText, Box, Divider, HStack, VStack } from '@gluestack-ui/themed';
import { useLocalSearchParams } from 'expo-router';
import React, { useCallback, useMemo } from 'react';
import { FlatList, StatusBar, StyleSheet } from 'react-native';
import { StoredPlayer } from '../types';

const Team: React.FC = () => {
  const { teamId, league, season } = useLocalSearchParams<{
    teamId: string;
    league: string;
    season: string;
  }>();

  const { players, isLoading } = useTeamPlayers(teamId, league, season);

  const renderPlayer = useCallback(
    ({ item }: { item: StoredPlayer }) => <PlayerCard player={item} />,
    []
  );

  const keyExtractor = useCallback((item: StoredPlayer) => item.id.toString(), []);

  const ListHeader = useMemo(
    () => (
      <VStack space="md" mb="$5">
        <SectionHeader title="Players" subtitle="Team Squad" count={players?.length || 0} />

        <HStack space="md" flexWrap="wrap">
          <Badge bg="$backgroundDark700" borderRadius="$md" mb="$2">
            <Ionicons
              name="football-outline"
              size={14}
              color="#9333ea"
              style={styles.iconMarginRight}
            />
            <BadgeText>Season: {season}</BadgeText>
          </Badge>
        </HStack>

        <Divider bg="$borderDark800" />
      </VStack>
    ),
    [players?.length, season]
  );

  const EmptyListComponent = useMemo(
    () => (
      <EmptyState
        message="No players available"
        icon={<MaterialIcons name="sports-soccer" size={48} color="#a0a0a0" />}
      />
    ),
    []
  );

  return (
    <Box flex={1} bg="$backgroundDark900">
      <StatusBar barStyle="light-content" />
      {isLoading ? (
        <LoadingSpinner message="Loading players..." />
      ) : (
        <FlatList
          data={players}
          renderItem={renderPlayer}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={ListHeader}
          ListEmptyComponent={EmptyListComponent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  iconMarginRight: {
    marginRight: 4,
  },
  listContent: {
    padding: 16,
  },
});

export default Team;
