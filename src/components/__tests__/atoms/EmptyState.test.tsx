import { render } from '@testing-library/react-native';
import React from 'react';
import { Text, View } from 'react-native';

// Create mock components with proper TypeScript types
const MockCenter = ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => (
  <View testID="mock-center" {...props}>{children}</View>
);

const MockVStack = ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => (
  <View testID="mock-vstack" {...props}>{children}</View>
);

const MockText = ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => (
  <Text testID="mock-text" {...props}>{children}</Text>
);

// Mock modules
jest.mock('@gluestack-ui/themed', () => ({
  Center: MockCenter,
  VStack: MockVStack,
  Text: MockText,
}));

// Import the component after mocking dependencies
const { EmptyState } = require('../../../components/atoms/EmptyState');

describe('EmptyState', () => {
  it('renders with message only', () => {
    const { getByText, getByTestId } = render(<EmptyState message="No data found" />);
    
    expect(getByTestId('mock-center')).toBeTruthy();
    expect(getByTestId('mock-vstack')).toBeTruthy();
    expect(getByTestId('mock-text')).toBeTruthy();
    expect(getByText('No data found')).toBeTruthy();
  });

  it('renders with message and icon', () => {
    const icon = <View testID="mock-custom-icon">Icon</View>;
    const { getByText, getByTestId } = render(
      <EmptyState message="No data found" icon={icon} />
    );
    
    expect(getByTestId('mock-center')).toBeTruthy();
    expect(getByTestId('mock-vstack')).toBeTruthy();
    expect(getByTestId('mock-text')).toBeTruthy();
    expect(getByTestId('mock-custom-icon')).toBeTruthy();
    expect(getByText('No data found')).toBeTruthy();
  });
});