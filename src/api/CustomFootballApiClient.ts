import Constants from 'expo-constants';
import { CustomHttpRequest } from './CustomHttpRequest';
import { FootballApiClient } from './generated/FootballApiClient';

export class CustomFootballApiClient extends FootballApiClient {
    constructor() {
        super(
            {
                BASE: Constants.expoConfig?.extra?.FOOTBALL_API_BASE_URL,
            },
            CustomHttpRequest
        );
    }
}
