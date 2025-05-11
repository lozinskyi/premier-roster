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

const MockSpinner = ({ ...props }: { [key: string]: any }) => (
  <View testID="mock-spinner" {...props} />
);

const MockText = ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => (
  <Text testID="mock-text" {...props}>{children}</Text>
);

// Mock modules
jest.mock('@gluestack-ui/themed', () => ({
  Center: MockCenter,
  VStack: MockVStack,
  Spinner: MockSpinner,
  Text: MockText,
}));

// Import the component after mocking dependencies
const { LoadingSpinner } = require('../../../components/atoms/LoadingSpinner');

describe('LoadingSpinner', () => {
  it('renders with default message', () => {
    const { getByText, getByTestId } = render(<LoadingSpinner />);
    
    expect(getByTestId('mock-center')).toBeTruthy();
    expect(getByTestId('mock-vstack')).toBeTruthy();
    expect(getByTestId('mock-spinner')).toBeTruthy();
    expect(getByText('Loading...')).toBeTruthy();
  });

  it('renders with custom message', () => {
    const { getByText, getByTestId } = render(<LoadingSpinner message="Please wait..." />);
    
    expect(getByTestId('mock-center')).toBeTruthy();
    expect(getByTestId('mock-vstack')).toBeTruthy();
    expect(getByTestId('mock-spinner')).toBeTruthy();
    expect(getByText('Please wait...')).toBeTruthy();
  });
});