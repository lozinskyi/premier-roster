import { Birth, Games, Player } from '../api/generated';

export type StoredPlayer = Pick<Player, 'id' | 'firstname' | 'lastname' | 'photo'> &
  Pick<Birth, 'date'> &
  Pick<Games, 'position'>;
