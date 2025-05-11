# Premier Roster 🏆

A football team management application built with Expo and React Native. This app allows you to browse Premier League teams and their players.

## Project Overview

Premier Roster uses the Football API to fetch team and player data. The app implements:
- Team listings
- Player details
- Local data storage with MMKV
- TypeScript for type safety
- UI components from Gluestack UI

## Prerequisites

- Node.js (18.x or later)
- npm or yarn
- iOS Simulator or Android Emulator for mobile testing
- Expo Go app for testing on physical devices

## Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/premier-roster.git
   cd premier-roster
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Environment Setup
   Create a `.env.local` file in the root directory with your API credentials:
   ```
   FOOTBALL_API_KEY=your_api_key_here
   FOOTBALL_API_BASE_URL=https://v3.football.api-sports.io/
   ```
   Note: `.env*.local` files are gitignored for security reasons

4. Start the development server
   ```bash
   npx expo start
   ```

## Available Scripts

- `npm start` or `npx expo start` - Start the Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run in web browser
- `npm run api:gen` - Generate API client from OpenAPI specification
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting with Prettier
- `npm run test` - Run tests with Jest
- `npm run test:watch` - Run tests in watch mode
- `npm run test:verbose` - Run tests with verbose output

## Development

This project uses:
- [Expo Router](https://docs.expo.dev/router/introduction) for file-based routing
- [Gluestack UI](https://gluestack.io/) for UI components
- [MMKV](https://github.com/mrousavy/react-native-mmkv) for local storage
- OpenAPI TypeScript code generation for API client

### Code Quality Tools

#### Linting
The project uses ESLint with the Expo configuration:
- Configuration: Using `eslint-config-expo` with customizations in `eslint.config.js`
- Ignored paths: `dist/*` and `src/api/generated/**` (auto-generated code)
- Run with: `npm run lint`

#### Code Formatting
The project uses Prettier for consistent code formatting:
- Configuration integrates with ESLint via eslint-config-prettier and eslint-plugin-prettier
- Format code with: `npm run format`
- Check formatting without making changes: `npm run format:check`

### Git Hooks

The project uses Husky and lint-staged to enforce code quality through git hooks:

- **Pre-commit Hook**: Before each commit, the following checks run automatically:
  - Prettier formats staged files
  - ESLint fixes linting issues

This ensures that all code committed to the repository meets the project's code style and quality standards.

### Testing

The project uses Jest and React Testing Library for unit and component testing:

- **Jest**: Test runner configured in `jest.config.js`
- **@testing-library/react-native**: For testing React Native components
- **@testing-library/jest-native**: For additional React Native specific matchers

Tests are located in `__tests__` directories throughout the project. Run tests with:

```bash
npm test
```

### CI/CD Pipeline

The project uses a comprehensive CI/CD pipeline to ensure code quality and streamline the deployment process:

#### Continuous Integration
- Automated testing with Jest
- Code quality checks with ESLint and Prettier

#### Continuous Deployment
The project uses EAS Build for creating and distributing builds:

- **Development Builds**: For local testing with development client
  ```bash
  eas build --profile development --platform all
  ```

- **Preview Builds**: For QA and stakeholder review
  ```bash
  eas build --profile preview --platform all
  ```

- **Production Builds**: For App Store and Play Store submission
  ```bash
  eas build --profile production --platform all
  eas submit --profile production --platform all
  ```

### Project Structure
```
├── app/                  # Application screens with file-based routing
├── assets/               # Static assets like images and fonts
├── codegen/              # OpenAPI specifications
├── src/
│   ├── api/              # API client and custom implementations
│   ├── components/       # React components 
│   ├── constants/        # Application constants
│   ├── hooks/            # Custom React hooks
│   ├── storage/          # Storage utilities
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
```

## Testing

You can test the application using:
- [iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Android Emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [Expo Go](https://expo.dev/go) on physical devices
- [Development builds](https://docs.expo.dev/develop/development-builds/introduction/)
