import { edificiosModels } from "./edificios.models";

export interface zonasComunesModel {
  id: string,
  name: string,
  codigoEdificio: string,
  edificios: edificiosModels[],
  estado: number,
  cost: number,
  description: string,
}