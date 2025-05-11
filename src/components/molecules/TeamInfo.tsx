import { MaterialIcons } from '@expo/vector-icons';
import { Heading, HStack, VStack } from '@gluestack-ui/themed';
import React from 'react';
import { CustomBadge } from '../atoms';

interface TeamInfoProps {
  name: string;
  founded?: number;
}

export const TeamInfo: React.FC<TeamInfoProps> = ({ name, founded }) => {
  return (
    <VStack flex={1} space="xs">
      <HStack justifyContent="space-between" alignItems="center">
        <Heading size="md" color="$textLight100">
          {name}
        </Heading>
        <MaterialIcons name="chevron-right" size={24} color="#FFC107" />
      </HStack>

      <HStack space="sm" alignItems="center" flexWrap="wrap">
        {founded && (
          <CustomBadge
            text={`Founded: ${founded}`}
            bgColor="$amber500"
            textColor="$backgroundDark900"
            variant="solid"
            size="sm"
            borderRadius="$sm"
          />
        )}
      </HStack>
    </VStack>
  );
};
