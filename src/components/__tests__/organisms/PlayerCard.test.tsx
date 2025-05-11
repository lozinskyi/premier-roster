import { render } from '@testing-library/react-native';
import React from 'react';
import { Image as RNImage, Text, View } from 'react-native';

// Define StoredPlayer type locally to avoid import issues
type StoredPlayer = {
  id: number;
  firstname: string;
  lastname: string;
  photo: string;
  position: string;
  date: string;
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

// Mock PlayerInfo component
const MockPlayerInfo = ({
  firstname,
  lastname,
  position,
  birthdate,
  ...props
}: {
  firstname: string;
  lastname: string;
  position: string;
  birthdate: string;
  [key: string]: any;
}) => (
  <View testID="mock-player-info" {...props}>
    <Text testID="mock-player-name">{`${firstname} ${lastname}`}</Text>
    <Text testID="mock-player-position">{position}</Text>
    <Text testID="mock-player-birthdate">{birthdate}</Text>
  </View>
);

// Mock modules
jest.mock('@gluestack-ui/themed', () => ({
  Box: MockBox,
  HStack: MockHStack,
  View: MockView,
  Image: MockImage,
}));

jest.mock('../../../components/molecules', () => ({
  PlayerInfo: MockPlayerInfo,
}));

// Import the component after mocking dependencies
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PlayerCard } = require('../../../components/organisms/PlayerCard');

describe('PlayerCard', () => {
  const mockPlayer: StoredPlayer = {
    id: 1,
    firstname: 'Bukayo',
    lastname: 'Saka',
    photo: 'https://example.com/saka.png',
    position: 'Attacker',
    date: '2001-09-05',
  };

  it('renders player information correctly', () => {
    const { getAllByTestId, getByTestId, getByText } = render(<PlayerCard player={mockPlayer} />);

    // Check if the card components are rendered
    expect(getAllByTestId('mock-box').length).toBeGreaterThan(0); // Check that at least one box exists
    expect(getAllByTestId('mock-hstack').length).toBeGreaterThan(0); // Check that at least one HStack exists
    expect(getByTestId('mock-image-remote')).toBeTruthy();

    // Check if player info component is rendered with correct props
    expect(getByTestId('mock-player-info')).toBeTruthy();
    expect(getByText('Bukayo Saka')).toBeTruthy();
    expect(getByText('Attacker')).toBeTruthy();
  });
});
