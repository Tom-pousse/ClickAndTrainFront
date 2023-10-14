import { Acquire } from './acquire';

export interface Player {
  num_id?: number;
  nom_pseudo: string;
  nom_email: string;
  nom_password?: string;
  //   nom_password_confirme?: string;
  num_score: number;
  boo_admin: boolean;
  // ajout de l'acces à acquire
  acquire: Acquire;
}
