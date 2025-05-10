import { StoredPlayer } from '@/src/types';
import { Box, HStack, Image, View } from '@gluestack-ui/themed';
import React, { memo } from 'react';
import { PlayerInfo } from '../molecules';

interface PlayerCardProps {
  player: StoredPlayer;
}

const PlayerCardComponent: React.FC<PlayerCardProps> = ({
  player
}) => {
  return (
    <Box 
      mb="$4" 
      borderRadius="$lg" 
      overflow="hidden" 
      bg="$backgroundDark800"
      borderWidth={1}
      borderColor="$borderDark700"
      shadowColor="$purple700"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.2}
      shadowRadius={3}
      elevation={3}
    >
      <View
        bg="$backgroundDark800"
      >
        <HStack>
          <Box
            overflow="hidden"
            bg="$backgroundDark700"
            borderRightWidth={1}
            borderRightColor="$borderDark600"
            justifyContent='center'
          >
            <Image 
              source={{ uri: player.photo }} 
              alt="Player Photo" 
              resizeMode="cover"
              height={150}
              aspectRatio={1}
            />
          </Box>
          
          <PlayerInfo 
            firstname={player.firstname}
            lastname={player.lastname}
            position={player.position}
            birthdate={player.date}
          />
        </HStack>
      </View>
    </Box>
  );
};

export const PlayerCard = memo(PlayerCardComponent);