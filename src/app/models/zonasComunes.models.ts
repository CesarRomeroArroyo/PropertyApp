import { edificiosModels } from "./edificios.models";

export interface zonasComunesModel {
  id: string,
  nombre: string,
  codigoEdificio: string,
  edificios: edificiosModels[],
  estado: number,
  costo: number,
  descripcion: string,
}