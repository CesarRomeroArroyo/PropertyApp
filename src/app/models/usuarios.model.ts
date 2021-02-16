import { apartamentosModel } from "./apartamentos.model";

export interface Usermodel {
  id: string,
  email: string,
  password: string,
  CC: number,
  codigoEdificios: string,
  estado: number,
  fechaCreacion: string,
  name: string,
  tel: number,
  tipo: string,
  apartamento: apartamentosModel,
  tipoInquilino: string
}

export interface UserAuthentication {
  user: string,
  password: string,
}
