import { PlayerResponse } from '../api/generated';
import { StoredPlayer } from '../types';

const convertPlayerResponseToStoredPlayer = ({
  player,
  statistics,
}: PlayerResponse): StoredPlayer => ({
  id: player.id,
  firstname: player.firstname,
  lastname: player.lastname,
  photo: player.photo,
  date: player.birth.date,
  position: statistics[0].games.position,
});

export default convertPlayerResponseToStoredPlayer;
