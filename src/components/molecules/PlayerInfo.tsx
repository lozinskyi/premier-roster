import { Ionicons } from '@expo/vector-icons';
import { Divider, Heading, HStack, Text, VStack } from '@gluestack-ui/themed';
import React from 'react';
import { CustomBadge } from '../atoms';

interface PlayerInfoProps {
  firstname: string;
  lastname: string;
  position: string;
  birthdate: string;
}

export const PlayerInfo: React.FC<PlayerInfoProps> = ({
  firstname,
  lastname,
  position,
  birthdate
}) => {
  return (
    <VStack flex={1} p="$4" justifyContent="space-between">
      <VStack space="xs">
        <HStack space="sm" mb="$1">
          <CustomBadge 
            text={position}
            bgColor="$amber500"
            textColor="$backgroundDark900" 
            variant="solid"
            size="sm"
            borderRadius="$sm"
          />
        </HStack>
        
        <Heading size="md" color="$textLight100">
          {`${firstname} ${lastname}`}
        </Heading>
      </VStack>
      <VStack space="xs">
        <Divider my="$2" bg="$borderDark700" />
        
        <VStack space="xs">
          <HStack space="md" alignItems="center">
            <Ionicons name="calendar-outline" size={14} color="#a0a0a0" />
            <Text fontSize="$sm" color="$textLight300">
              {new Date(birthdate).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
};