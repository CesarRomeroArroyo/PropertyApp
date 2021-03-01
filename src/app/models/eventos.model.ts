import { Usermodel } from './usuarios.model';
import { apartamentosModel } from './apartamentos.model';
import { zonasComunesModel } from './zonasComunes.models';

export interface eventosModel {
  dateEvent: string,
  description: string,
  state: number,
  timeEnd: string,
  timeInicial: string,
  title: string,
  user: Usermodel,
  apartamentUser: apartamentosModel,
  zoneCommon: zonasComunesModel,
  id: string
}