import { Center, Text, VStack } from '@gluestack-ui/themed';
import React, { ReactNode, memo } from 'react';

interface EmptyStateProps {
  message: string;
  icon?: ReactNode;
}

const EmptyStateComponent: React.FC<EmptyStateProps> = ({ 
  message, 
  icon 
}) => {
  return (
    <Center flex={1} p="$10">
      <VStack space="md" alignItems="center">
        {icon}
        <Text fontSize="$lg" color="$textLight400">{message}</Text>
      </VStack>
    </Center>
  );
};

export const EmptyState = memo(EmptyStateComponent);