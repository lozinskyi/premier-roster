import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Text, TextInput, View } from 'react-native';

// Create mock components with proper TypeScript types
const MockBox = ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => (
  <View testID="mock-box" {...props}>{children}</View>
);

const MockInput = ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => (
  <View testID="mock-input" {...props}>{children}</View>
);

const MockInputField = ({ 
  onChangeText, 
  value, 
  ...props 
}: { 
  onChangeText?: (text: string) => void;
  value?: string;
  [key: string]: any;
}) => (
  <TextInput
    testID="mock-input-field"
    value={value}
    onChangeText={onChangeText}
    {...props}
  />
);

const MockInputSlot = ({ 
  children, 
  onPress, 
  pl,
  pr,
  ...props 
}: { 
  children?: React.ReactNode;
  onPress?: () => void;
  pl?: string;
  pr?: string;
  [key: string]: any;
}) => {
  // Determine testID based on props to differentiate between search and clear slots
  const testID = onPress ? "mock-input-slot-clear" : "mock-input-slot-search";
  
  return (
    <View
      testID={testID}
      onTouchEnd={onPress}
      {...props}
    >
      {children}
    </View>
  );
};

// Mock Ionicons component from @expo/vector-icons
const MockIonicons = ({ 
  name, 
  size, 
  color, 
  ...props 
}: { 
  name: string;
  size?: number;
  color?: string;
  [key: string]: any;
}) => (
  <View 
    testID={`mock-icon-${name}`}
    style={{ width: size, height: size }}
    {...props}
  >
    <Text>{name}</Text>
  </View>
);

// Mock modules
jest.mock('@gluestack-ui/themed', () => ({
  Box: MockBox,
  Input: MockInput,
  InputField: MockInputField,
  InputSlot: MockInputSlot,
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: MockIonicons,
}));

// Import the component after mocking dependencies
const { SearchBar } = require('../../../components/molecules/SearchBar');

describe('SearchBar', () => {
  it('renders with default placeholder', () => {
    const mockChangeText = jest.fn();
    const { getByTestId, getByPlaceholderText } = render(
      <SearchBar value="" onChangeText={mockChangeText} />
    );
    
    expect(getByTestId('mock-box')).toBeTruthy();
    expect(getByTestId('mock-input')).toBeTruthy();
    expect(getByTestId('mock-input-field')).toBeTruthy();
    expect(getByTestId('mock-icon-search')).toBeTruthy();
    expect(getByPlaceholderText('Search...')).toBeTruthy();
  });

  it('renders with custom placeholder', () => {
    const mockChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar value="" onChangeText={mockChangeText} placeholder="Find teams..." />
    );
    
    expect(getByPlaceholderText('Find teams...')).toBeTruthy();
  });

  it('displays clear button when there is input and clears text on press', () => {
    const mockChangeText = jest.fn();
    const { getByTestId } = render(
      <SearchBar value="test" onChangeText={mockChangeText} />
    );
    
    const clearButton = getByTestId('mock-icon-close');
    expect(clearButton).toBeTruthy();
    
    const parentSlot = getByTestId('mock-input-slot-clear');
    fireEvent(parentSlot, 'onTouchEnd');
    
    expect(mockChangeText).toHaveBeenCalledWith('');
  });

  it('does not display clear button when input is empty', () => {
    const mockChangeText = jest.fn();
    const { queryByTestId } = render(
      <SearchBar value="" onChangeText={mockChangeText} />
    );
    
    expect(queryByTestId('mock-icon-close')).toBeNull();
  });

  it('calls onChangeText when text changes', () => {
    const mockChangeText = jest.fn();
    const { getByTestId } = render(
      <SearchBar value="" onChangeText={mockChangeText} />
    );
    
    const input = getByTestId('mock-input-field');
    fireEvent.changeText(input, 'test input');
    
    expect(mockChangeText).toHaveBeenCalledWith('test input');
  });
});