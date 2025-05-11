import { Center, Spinner, Text, VStack } from '@gluestack-ui/themed';
import React, { memo } from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinnerComponent: React.FC<LoadingSpinnerProps> = ({ message = 'Loading...' }) => {
  return (
    <Center flex={1}>
      <VStack space="md" alignItems="center">
        <Spinner size="large" color="$purple500" />
        <Text color="$textLight200">{message}</Text>
      </VStack>
    </Center>
  );
};

export const LoadingSpinner = memo(LoadingSpinnerComponent);
