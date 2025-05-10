import { CustomHttpRequest } from './CustomHttpRequest';
import { FootballApiClient } from './generated/FootballApiClient';

export class CustomFootballApiClient extends FootballApiClient {
    constructor() {
        super(
            {
                BASE: 'https://v3.football.api-sports.io/',
            },
            CustomHttpRequest
        );
    }
}
