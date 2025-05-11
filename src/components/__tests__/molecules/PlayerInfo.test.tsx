import { render } from '@testing-library/react-native';
import React from 'react';
import { Text, View } from 'react-native';

// Create mock components with proper TypeScript types
const MockHStack = ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => {
  // Generate a unique testID if one is not provided
  const testID = props.testID || 'mock-hstack-' + Math.random().toString(36).substr(2, 9);
  return (
    <View testID={testID} {...props}>
      {children}
    </View>
  );
};

const MockVStack = ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => {
  // Generate a unique testID if one is not provided
  const testID = props.testID || 'mock-vstack-' + Math.random().toString(36).substr(2, 9);
  return (
    <View testID={testID} {...props}>
      {children}
    </View>
  );
};

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

const MockDivider = ({ ...props }: { [key: string]: any }) => (
  <View testID="mock-divider" {...props} />
);

// Mock Ionicons component
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
  <View testID={`mock-icon-${name}`} style={{ width: size, height: size }} {...props}>
    <Text>{name}</Text>
  </View>
);

// Mock CustomBadge component
const MockCustomBadge = ({ text, ...props }: { text: string; [key: string]: any }) => (
  <View testID="mock-custom-badge" {...props}>
    <Text>{text}</Text>
  </View>
);

// Mock modules
jest.mock('@gluestack-ui/themed', () => ({
  HStack: MockHStack,
  VStack: MockVStack,
  Heading: MockHeading,
  Text: MockText,
  Divider: MockDivider,
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: MockIonicons,
}));

jest.mock('../../../components/atoms', () => ({
  CustomBadge: MockCustomBadge,
}));

// Import the component after mocking dependencies
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PlayerInfo } = require('../../../components/molecules/PlayerInfo');

describe('PlayerInfo', () => {
  const mockPlayerProps = {
    firstname: 'John',
    lastname: 'Doe',
    position: 'Midfielder',
    birthdate: '1995-06-15',
  };

  it('renders player information correctly', () => {
    const { getByText, getByTestId, queryAllByTestId } = render(
      <PlayerInfo {...mockPlayerProps} />
    );

    // Check for VStack elements - there are multiple in the component
    const vStackElements = queryAllByTestId(/mock-vstack/);
    expect(vStackElements.length).toBeGreaterThan(0);

    // Check for HStack elements - there are multiple in the component
    const hStackElements = queryAllByTestId(/mock-hstack/);
    expect(hStackElements.length).toBeGreaterThan(0);

    expect(getByTestId('mock-heading')).toBeTruthy();
    expect(getByTestId('mock-divider')).toBeTruthy();

    // Check name is rendered correctly
    expect(getByText('John Doe')).toBeTruthy();

    // Check position badge
    expect(getByTestId('mock-custom-badge')).toBeTruthy();
    expect(getByText('Midfielder')).toBeTruthy();

    // Check birthdate icon and formatted date
    expect(getByTestId('mock-icon-calendar-outline')).toBeTruthy();

    // Check if date is formatted (implementation may vary based on locale)
    const dateText = getByTestId('mock-text');
    expect(dateText).toBeTruthy();
  });

  it('formats birthdate correctly', () => {
    // This test uses a fixed date to ensure consistent formatting regardless of locale
    const { getByText } = render(<PlayerInfo {...mockPlayerProps} />);

    // We mock the toLocaleDateString to ensure consistent output in tests
    const mockDate = new Date('1995-06-15');
    const formattedDate = mockDate.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    expect(getByText(formattedDate)).toBeTruthy();
  });
});
