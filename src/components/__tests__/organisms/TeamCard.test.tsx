import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Image as RNImage, Text, TouchableOpacity, View } from 'react-native';

// Define Team type locally to avoid import path issues
type Team = {
  id: number;
  name: string;
  founded?: number;
  logo: string;
  code: string;
  country: string;
  national: boolean;
};

// Create mock components with proper TypeScript types
const MockBox = ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => (
  <View testID="mock-box" {...props}>
    {children}
  </View>
);

const MockHStack = ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => (
  <View testID="mock-hstack" {...props}>
    {children}
  </View>
);

const MockView = ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => (
  <View testID="mock-view" {...props}>
    {children}
  </View>
);

const MockPressable = ({
  children,
  onPress,
  ...props
}: {
  children?: React.ReactNode;
  onPress?: () => void;
  [key: string]: any;
}) => (
  <TouchableOpacity testID="mock-pressable" onPress={onPress} {...props}>
    {children}
  </TouchableOpacity>
);

const MockImage = ({
  source,
  alt,
  ...props
}: {
  source: { uri: string } | number;
  alt: string;
  [key: string]: any;
}) => (
  <RNImage
    testID={`mock-image-${typeof source === 'object' && source.uri ? 'remote' : 'local'}`}
    source={source}
    accessibilityLabel={alt}
    {...props}
  />
);

// Mock TeamInfo component
const MockTeamInfo = ({
  name,
  founded,
  ...props
}: {
  name: string;
  founded?: number;
  [key: string]: any;
}) => (
  <View testID="mock-team-info" {...props}>
    <Text testID="mock-team-name">{name}</Text>
    {founded && <Text testID="mock-team-founded">Founded: {founded}</Text>}
  </View>
);

// Mock modules
jest.mock('@gluestack-ui/themed', () => ({
  Box: MockBox,
  HStack: MockHStack,
  View: MockView,
  Pressable: MockPressable,
  Image: MockImage,
}));

jest.mock('../../../components/molecules', () => ({
  TeamInfo: MockTeamInfo,
}));

// Import the component after mocking dependencies
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { TeamCard } = require('../../../components/organisms/TeamCard');

describe('TeamCard', () => {
  const mockTeam: Team = {
    id: 1,
    name: 'Arsenal FC',
    founded: 1886,
    logo: 'https://example.com/arsenal.png',
    code: 'ARS',
    country: 'England',
    national: false,
  };

  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders team information correctly', () => {
    const { getAllByTestId, getByTestId, getByText } = render(
      <TeamCard team={mockTeam} onPress={mockOnPress} />
    );

    // Check if the card components are rendered
    expect(getAllByTestId('mock-box').length).toBeGreaterThan(0); // Check that at least one box exists
    expect(getByTestId('mock-pressable')).toBeTruthy();
    expect(getByTestId('mock-image-remote')).toBeTruthy();

    // Check if team info is passed correctly to TeamInfo component
    expect(getByTestId('mock-team-info')).toBeTruthy();
    expect(getByText('Arsenal FC')).toBeTruthy();
    expect(getByText('Founded: 1886')).toBeTruthy();
  });

  it('calls onPress handler when pressed', () => {
    const { getByTestId } = render(<TeamCard team={mockTeam} onPress={mockOnPress} />);

    const pressable = getByTestId('mock-pressable');
    fireEvent.press(pressable);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
    expect(mockOnPress).toHaveBeenCalledWith(mockTeam);
  });
});
