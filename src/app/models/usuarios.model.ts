export interface Usermodel {
  
    idunico: string;
    nombre: string;
    cedula: number;
    email: string;
    telefono: number;
    estado: number;
    usuario: string;
    password: string;
    tipo: string;
    fechaCreacion: string;
    fechaModificacion: string;
    turnos: string[];
    codigoverificacion: string[];
    apartamentoid: string;
}

export interface UserAuthentication {
    user: string,
    password: string;
}
