import { render } from '@testing-library/react-native';
import React from 'react';
import { Text, View } from 'react-native';

// Create mock components with proper TypeScript types
const MockView = ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => (
  <View testID="mock-view" {...props}>
    {children}
  </View>
);

const MockHStack = ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => (
  <View testID="mock-hstack" {...props}>
    {children}
  </View>
);

const MockVStack = ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => (
  <View testID="mock-vstack" {...props}>
    {children}
  </View>
);

const MockHeading = ({
  children,
  ...props
}: {
  children?: React.ReactNode;
  [key: string]: any;
}) => (
  <Text testID="mock-heading" {...props}>
    {children}
  </Text>
);

const MockText = ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => (
  <Text testID="mock-text" {...props}>
    {children}
  </Text>
);

const MockBadge = ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => (
  <View testID="mock-badge" {...props}>
    {children}
  </View>
);

const MockBadgeText = ({
  children,
  ...props
}: {
  children?: React.ReactNode;
  [key: string]: any;
}) => (
  <Text testID="mock-badge-text" {...props}>
    {children}
  </Text>
);

// Mock modules
jest.mock('@gluestack-ui/themed', () => ({
  View: MockView,
  HStack: MockHStack,
  VStack: MockVStack,
  Heading: MockHeading,
  Text: MockText,
  Badge: MockBadge,
  BadgeText: MockBadgeText,
}));

// Import the component after mocking dependencies
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { SectionHeader } = require('../../../components/molecules/SectionHeader');

describe('SectionHeader', () => {
  it('renders with title only', () => {
    const { getByText, getByTestId, queryByTestId } = render(<SectionHeader title="Teams" />);

    expect(getByTestId('mock-view')).toBeTruthy();
    expect(getByTestId('mock-hstack')).toBeTruthy();
    expect(getByTestId('mock-vstack')).toBeTruthy();
    expect(getByTestId('mock-heading')).toBeTruthy();
    expect(getByText('Teams')).toBeTruthy();

    // Should not render subtitle or count badge
    expect(queryByTestId('mock-text')).toBeNull();
    expect(queryByTestId('mock-badge')).toBeNull();
  });

  it('renders with title and subtitle', () => {
    const { getByText } = render(<SectionHeader title="Teams" subtitle="Premier League" />);

    expect(getByText('Teams')).toBeTruthy();
    expect(getByText('Premier League')).toBeTruthy();
  });

  it('renders with title and count', () => {
    const { getByText, getByTestId } = render(<SectionHeader title="Teams" count={20} />);

    expect(getByText('Teams')).toBeTruthy();
    expect(getByTestId('mock-badge')).toBeTruthy();
    expect(getByText('20')).toBeTruthy();
  });

  it('renders with title, subtitle, and count', () => {
    const { getByText } = render(
      <SectionHeader title="Teams" subtitle="Premier League" count={20} />
    );

    expect(getByText('Teams')).toBeTruthy();
    expect(getByText('Premier League')).toBeTruthy();
    expect(getByText('20')).toBeTruthy();
  });
});
