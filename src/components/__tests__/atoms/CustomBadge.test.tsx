import { render } from '@testing-library/react-native';
import React from 'react';
import { Text, View } from 'react-native';

// Create mock components with proper TypeScript types
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
  Badge: MockBadge,
  BadgeText: MockBadgeText,
}));

// Import the component after mocking dependencies
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { CustomBadge } = require('../../../components/atoms/CustomBadge');

describe('CustomBadge', () => {
  it('renders with default props', () => {
    const { getByTestId, getByText } = render(<CustomBadge text="Test Badge" />);

    expect(getByTestId('mock-badge')).toBeTruthy();
    expect(getByTestId('mock-badge-text')).toBeTruthy();
    expect(getByText('Test Badge')).toBeTruthy();
  });

  it('renders with custom background and text colors', () => {
    const { getByTestId, getByText } = render(
      <CustomBadge text="Custom Colors" bgColor="#FF0000" textColor="#FFFFFF" />
    );

    const badge = getByTestId('mock-badge');
    const badgeText = getByTestId('mock-badge-text');

    expect(badge.props.bg).toBe('#FF0000');
    expect(badgeText.props.color).toBe('#FFFFFF');
    expect(getByText('Custom Colors')).toBeTruthy();
  });

  it('renders with different variant and action props', () => {
    const { getByTestId } = render(
      <CustomBadge text="Variant Badge" variant="outline" action="success" size="lg" />
    );

    const badge = getByTestId('mock-badge');

    expect(badge.props.variant).toBe('outline');
    expect(badge.props.action).toBe('success');
    expect(badge.props.size).toBe('lg');
  });
});
