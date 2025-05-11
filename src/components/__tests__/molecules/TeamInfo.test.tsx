import { render } from '@testing-library/react-native';
import React from 'react';
import { Text, View } from 'react-native';

// Create mock components with proper TypeScript types
const MockHStack = ({
  children,
  testID = 'mock-hstack',
  ...props
}: {
  children?: React.ReactNode;
  testID?: string;
  [key: string]: any;
}) => (
  <View testID={testID} {...props}>
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

// Mock MaterialIcons component
const MockMaterialIcons = ({
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
}));

jest.mock('@expo/vector-icons', () => ({
  MaterialIcons: MockMaterialIcons,
}));

jest.mock('../../../components/atoms', () => ({
  CustomBadge: MockCustomBadge,
}));

// Import the component after mocking dependencies
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { TeamInfo } = require('../../../components/molecules/TeamInfo');

describe('TeamInfo', () => {
  it('renders with team name only', () => {
    const { getByText, getByTestId, queryByTestId, getAllByTestId } = render(
      <TeamInfo name="Arsenal FC" />
    );

    expect(getByTestId('mock-vstack')).toBeTruthy();
    expect(getAllByTestId(/mock-hstack/)).toHaveLength(2);
    expect(getByTestId('mock-heading')).toBeTruthy();
    expect(getByText('Arsenal FC')).toBeTruthy();
    expect(getByTestId('mock-icon-chevron-right')).toBeTruthy();

    // Should not render founded badge
    expect(queryByTestId('mock-custom-badge')).toBeNull();
  });

  it('renders with team name and founded year', () => {
    const { getByText, getByTestId } = render(<TeamInfo name="Arsenal FC" founded={1886} />);

    expect(getByText('Arsenal FC')).toBeTruthy();
    expect(getByTestId('mock-custom-badge')).toBeTruthy();
    expect(getByText('Founded: 1886')).toBeTruthy();
  });
});
