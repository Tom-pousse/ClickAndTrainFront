import { Acquire } from './acquire';
import { Enable } from './enable';
import { Param } from './param';

export interface Player {
  id_players: number;
  nom_pseudo: string;
  nom_email: string;
  nom_password?: string;
  //   nom_password_confirme?: string;
  num_score: number;
  // ajout du nombre de clik
  num_click: number;
  boo_admin: boolean;
  // ajout de l'acces à acquire
  acquire: Acquire[];
  enable: Enable[];
  param: Param[];
}
