import { edificiosModels } from "./edificios.models";

export interface apartamentosModel {
  id: string,
  codigoEdificio: string,
  edificios: edificiosModels[],
  estado: number,
  name: string,
  tipoInquilino: string
}