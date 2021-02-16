import { edificiosModels } from "./edificios.models";

export interface userAdminModel {
  name: string,
  email: string,
  estado: number,
  tipo: string,
  edificios: edificiosModels[],
  password: string
}