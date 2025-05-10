/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Cards } from './Cards';
import type { Dribbles } from './Dribbles';
import type { Duels } from './Duels';
import type { Fouls } from './Fouls';
import type { Games } from './Games';
import type { Goals } from './Goals';
import type { League } from './League';
import type { Passes } from './Passes';
import type { Penalty } from './Penalty';
import type { Shots } from './Shots';
import type { Substitutes } from './Substitutes';
import type { Tackles } from './Tackles';
import type { Team } from './Team';
export type PlayerStatistics = {
    team: Team;
    league: League;
    games: Games;
    substitutes: Substitutes;
    shots: Shots;
    goals: Goals;
    passes: Passes;
    tackles: Tackles;
    duels: Duels;
    dribbles: Dribbles;
    fouls: Fouls;
    cards: Cards;
    penalty: Penalty;
};

