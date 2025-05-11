import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '../api/apiClient';
import { asyncStorage } from '../storage';
import { StoredPlayer } from '../types';
import { convertPlayerResponseToStoredPlayer } from '../utils';

export const useTeamPlayers = (teamId: string, league: string, season: string) => {
  const [players, setPlayers] = useState<StoredPlayer[] | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const storageKey = `players-${teamId}-${league}-${season}`;
  const timestampStorageKey = `${storageKey}-timestamp`;

  const fetchPlayers = useCallback(async () => {
    try {
      // Check if players are stored in asyncStorage
      const storedPlayers = await asyncStorage.getItem(storageKey);
      const storedTimestamp = await asyncStorage.getItem(timestampStorageKey);
      const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
      const isDataStale =
        storedTimestamp && Date.now() - parseInt(storedTimestamp, 10) > thirtyDaysInMs;

      if (storedPlayers && !isDataStale) {
        setPlayers(JSON.parse(storedPlayers));
      } else {
        let allPlayers: StoredPlayer[] = [];
        let currentPage = 1;
        let totalPages = 1;

        // Fetch all pages of players
        do {
          const fetchedPlayers = await apiClient.default.getPlayers(
            league,
            season,
            teamId,
            currentPage
          );
          const playersData =
            fetchedPlayers.response?.map(convertPlayerResponseToStoredPlayer) || [];
          allPlayers = [...allPlayers, ...playersData];

          // Update paging information
          const paging = fetchedPlayers.paging || {};
          currentPage = paging.current || currentPage;
          totalPages = paging.total || totalPages;
          currentPage++;
        } while (currentPage <= totalPages);

        // Save all players to asyncStorage and state
        await asyncStorage.setItem(storageKey, JSON.stringify(allPlayers));
        await asyncStorage.setItem(timestampStorageKey, Date.now().toString());
        setPlayers(allPlayers);
      }
    } catch (error) {
      console.error('Error fetching players:', error);
    } finally {
      setIsLoading(false);
    }
  }, [teamId, season, storageKey, timestampStorageKey, league]);

  useEffect(() => {
    if (!players) {
      fetchPlayers();
    }
  }, [fetchPlayers, players]);

  return { players, isLoading };
};
