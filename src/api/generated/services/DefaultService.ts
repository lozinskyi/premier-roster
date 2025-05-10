/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Paging } from '../models/Paging';
import type { Parameters } from '../models/Parameters';
import type { PlayerParameters } from '../models/PlayerParameters';
import type { PlayerResponse } from '../models/PlayerResponse';
import type { TeamResponse } from '../models/TeamResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class DefaultService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get teams by league and season
     * @param league
     * @param season
     * @returns any Successful response
     * @throws ApiError
     */
    public getTeams(
        league: string,
        season: string,
    ): CancelablePromise<{
        get?: string;
        parameters?: Parameters;
        errors?: Array<string>;
        results?: number;
        paging?: Paging;
        response?: Array<TeamResponse>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/teams',
            query: {
                'league': league,
                'season': season,
            },
        });
    }
    /**
     * Get players by league, season, team, and page
     * @param league
     * @param season
     * @param team
     * @param page
     * @returns any Successful response
     * @throws ApiError
     */
    public getPlayers(
        league: string,
        season: string,
        team: string,
        page?: number,
    ): CancelablePromise<{
        get?: string;
        parameters?: PlayerParameters;
        errors?: Array<string>;
        results?: number;
        paging?: Paging;
        response?: Array<PlayerResponse>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/players',
            query: {
                'league': league,
                'season': season,
                'team': team,
                'page': page,
            },
        });
    }
}
