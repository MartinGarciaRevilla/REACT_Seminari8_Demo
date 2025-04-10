export interface User {
    _id: string; // Optional, as it might not be returned from the API
    name: string;
    age: number;
    email?: string;
    password?: string;
    phone?: number;
}


/*
// EXEMPLE SI LA API ENS RETORNES ATRIBUTS AMB DIF NOM DEL NOSTRE
export type UsersResponseFromApi = Array<{
    nombre: string;
    edad: number;
    correo?: string;
}>;
*/
