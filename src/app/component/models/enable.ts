import { Param } from './param';

export interface Enable {
  id_players: number;
  id_param: number;
  boo_status: boolean;
  param?: Param[];
  // on a modif param[]
}
