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

- Node.js (14.x or later)
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

4. Generate API client
   ```bash
   npm run api:gen
   ```

5. Start the development server
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

## Development

This project uses:
- [Expo Router](https://docs.expo.dev/router/introduction) for file-based routing
- [Gluestack UI](https://gluestack.io/) for UI components
- [MMKV](https://github.com/mrousavy/react-native-mmkv) for local storage
- OpenAPI TypeScript code generation for API client

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
