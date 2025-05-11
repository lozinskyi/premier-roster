import { useCallback, useEffect, useState } from 'react';
import { apiClient } from '../api/apiClient';
import { Team } from '../api/generated';
import { CLUB_NICKNAMES } from '../constants';
import { asyncStorage } from '../storage';

export const useTeams = (league: string, season: string) => {
  const [teams, setTeams] = useState<Team[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  const filteredTeams = teams?.filter(team => {
    const teamName = team.name.toLowerCase();
    const teamNickname = CLUB_NICKNAMES[team.name]?.toLowerCase();
    const searchTerm = searchText.toLowerCase();
    return teamName.includes(searchTerm) || teamNickname.includes(searchTerm);
  });

  const storageKey = `teams-${league}-${season}`;

  const fetchTeams = useCallback(async () => {
    try {
      // Check if teams are stored in asyncStorage
      const storedTeams = await asyncStorage.getItem(storageKey);
      if (storedTeams) {
        setTeams(JSON.parse(storedTeams));
      } else {
        console.log('Fetching teams from API...');
        // Fetch teams from API if not in asyncStorage
        const fetchedTeams = await apiClient.default.getTeams(league, season);
        const teamsData = fetchedTeams.response?.map(item => item.team);
        if (teamsData) {
          await asyncStorage.setItem(storageKey, JSON.stringify(teamsData));
          setTeams(teamsData);
        }
      }
    } catch (error) {
      console.error('Error fetching teams:', error);
    } finally {
      setIsLoading(false);
    }
  }, [league, season, storageKey]);

  useEffect(() => {
    if (!teams) {
      fetchTeams();
    }
  }, [fetchTeams, teams]);

  return { teams: filteredTeams, isLoading, setSearchText, searchText };
};
