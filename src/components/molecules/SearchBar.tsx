import { Ionicons } from '@expo/vector-icons';
import { Box, Input, InputField, InputSlot } from '@gluestack-ui/themed';
import { FC } from 'react';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search...',
}) => {
  return (
    <Box width="100%">
      <Input
        variant="outline"
        size="md"
        borderColor="$borderDark700"
        backgroundColor="$backgroundDark800"
        borderRadius="$lg"
        height={42}
      >
        <InputSlot pl="$3">
          <Ionicons name="search" size={20} color="#a0a0a0" />
        </InputSlot>
        <InputField
          color="$textLight100"
          placeholderTextColor="$textDark400"
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {value ? (
          <InputSlot pr="$3" onPress={() => onChangeText('')}>
            <Ionicons name="close" size={20} color="#a0a0a0" />
          </InputSlot>
        ) : null}
      </Input>
    </Box>
  );
};
