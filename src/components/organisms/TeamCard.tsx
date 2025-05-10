import { Team } from '@/src/api/generated';
import { Box, HStack, Image, Pressable, View } from '@gluestack-ui/themed';
import React, { memo, useCallback } from 'react';
import { TeamInfo } from '../molecules';

interface TeamCardProps {
  team: Team;
  onPress: (teamId: string) => void;
}

const TeamCardComponent: React.FC<TeamCardProps> = ({
  team,
  onPress
}) => {
  const handlePress = useCallback(() => {
    onPress(team.id.toString());
  }, [onPress, team.id]);

  return (
    <Pressable 
      onPress={handlePress}
      mb="$3"
    >
      <Box 
        bg="$backgroundDark800" 
        borderRadius="$lg" 
        overflow="hidden"
        borderWidth={1}
        borderColor="$borderDark700"
        shadowColor="$purple700"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.3}
        shadowRadius={3}
        elevation={5}
      >
        <View
          bg="$purple900"
          p="$1"
        >
          <HStack space="md" alignItems="center" p="$3">
            <Box 
              bg="$backgroundDark700" 
              p="$2" 
              borderRadius="$full"
              borderWidth={2}
              borderColor="$borderDark600"
            >
              <Image 
                source={{ uri: team.logo }} 
                alt="Team Logo" 
                size="md"
              />
            </Box>
            
            <TeamInfo 
              name={team.name} 
              founded={team.founded} 
            />
          </HStack>
        </View>
      </Box>
    </Pressable>
  );
};

export const TeamCard = memo(TeamCardComponent);