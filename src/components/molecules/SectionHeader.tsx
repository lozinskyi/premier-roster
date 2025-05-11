import { Badge, BadgeText, Heading, HStack, Text, View, VStack } from '@gluestack-ui/themed';
import React, { memo } from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  count?: number;
}

const SectionHeaderComponent: React.FC<SectionHeaderProps> = ({ title, subtitle, count }) => {
  return (
    <View bg="$purple900" borderRadius="$lg" p="$4">
      <HStack alignItems="center" justifyContent="space-between">
        <VStack>
          {subtitle && (
            <Text color="$textLight200" size="sm">
              {subtitle}
            </Text>
          )}
          <Heading size="xl" color="$textLight100">
            {title}
          </Heading>
        </VStack>
        {count !== undefined && (
          <Badge bg="$amber500" borderRadius="$full" size="md">
            <BadgeText color="$backgroundDark900" fontWeight="$bold">
              {count}
            </BadgeText>
          </Badge>
        )}
      </HStack>
    </View>
  );
};

export const SectionHeader = memo(SectionHeaderComponent);
