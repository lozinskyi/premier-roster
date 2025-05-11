/**
 * Common mock implementations for UI components and third-party libraries used across tests.
 * This file centralizes all mocks to maintain consistency and reduce duplication.
 */

// Mock for @gluestack-ui/themed components
export const setupGluestackUIMocks = () => {
  jest.mock('@gluestack-ui/themed', () => {
    const originalModule = jest.requireActual('@gluestack-ui/themed');
    return {
      ...originalModule,
      // Layout components
      View: jest.fn(({ children, ...props }) => ({
        type: 'mockView',
        props: { 'data-testid': 'mock-view', ...props, children },
      })),
      Box: jest.fn(({ children, ...props }) => ({
        type: 'mockBox',
        props: { 'data-testid': 'mock-box', ...props, children },
      })),
      Center: jest.fn(({ children, ...props }) => ({
        type: 'mockCenter',
        props: { 'data-testid': 'mock-center', ...props, children },
      })),
      HStack: jest.fn(({ children, ...props }) => ({
        type: 'mockHStack',
        props: { 'data-testid': 'mock-hstack', ...props, children },
      })),
      VStack: jest.fn(({ children, ...props }) => ({
        type: 'mockVStack',
        props: { 'data-testid': 'mock-vstack', ...props, children },
      })),
      
      // Typography components
      Text: jest.fn(({ children, ...props }) => ({
        type: 'mockText',
        props: { 'data-testid': 'mock-text', ...props, children },
      })),
      Heading: jest.fn(({ children, ...props }) => ({
        type: 'mockHeading',
        props: { 'data-testid': 'mock-heading', ...props, children },
      })),
      
      // Form components
      Input: jest.fn(({ children, ...props }) => ({
        type: 'mockInput',
        props: { 'data-testid': 'mock-input', ...props, children },
      })),
      InputField: jest.fn(({ onChangeText, value, ...props }) => ({
        type: 'mockInputField',
        props: { 'data-testid': 'mock-input-field', value, onChangeText, ...props },
      })),
      InputSlot: jest.fn(({ children, onPress, ...props }) => ({
        type: 'mockInputSlot',
        props: { 'data-testid': 'mock-input-slot', onTouchEnd: onPress, ...props, children },
      })),
      
      // Feedback components
      Badge: jest.fn(({ children, ...props }) => ({
        type: 'mockBadge',
        props: { 'data-testid': 'mock-badge', ...props, children },
      })),
      BadgeText: jest.fn(({ children, ...props }) => ({
        type: 'mockBadgeText',
        props: { 'data-testid': 'mock-badge-text', ...props, children },
      })),
      Spinner: jest.fn((props) => ({
        type: 'mockSpinner',
        props: { 'data-testid': 'mock-spinner', ...props },
      })),
      Divider: jest.fn((props) => ({
        type: 'mockDivider',
        props: { 'data-testid': 'mock-divider', ...props },
      })),
    };
  });
};

// Mock for @expo/vector-icons components
export const setupExpoVectorIconsMocks = () => {
  jest.mock('@expo/vector-icons', () => ({
    // Mock for Ionicons
    Ionicons: jest.fn(({ name, size, color }) => ({
      type: 'mockIonicon',
      props: { 
        'data-testid': `mock-icon-${name}`,
        style: { 
          width: typeof size === 'number' ? size : 24, 
          height: typeof size === 'number' ? size : 24, 
          backgroundColor: color 
        },
        children: name
      }
    })),
    
    // Mock for MaterialIcons
    MaterialIcons: jest.fn(({ name, size, color }) => ({
      type: 'mockMaterialIcon',
      props: { 
        'data-testid': `mock-icon-${name}`, 
        style: { width: size, height: size, backgroundColor: color },
        children: name
      }
    })),
  }));
};

// Mock for custom components from the project
export const setupCustomComponentsMocks = () => {
  jest.mock('../../../components/atoms', () => ({
    CustomBadge: jest.fn(({ text, ...props }) => ({
      type: 'mockCustomBadge',
      props: { 'data-testid': 'mock-custom-badge', ...props, children: text }
    })),
  }));
};

// Setup all mocks at once
export const setupAllMocks = () => {
  setupGluestackUIMocks();
  setupExpoVectorIconsMocks();
  setupCustomComponentsMocks();
};