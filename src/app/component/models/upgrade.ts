import { Acquire } from './acquire';

export interface Upgrade {
  id_upgrade?: number;

  nom_name: string;
  num_cost: number;
  num_value: number;
  acquire: Acquire[];
}
