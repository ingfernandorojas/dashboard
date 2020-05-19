export interface Users {
    nombre: string;
    apellido: string;
    email: string;
    username: string;
    password: string;
    role: string;
    createdAt ?: string;
    updatedAt ?: string;
    active ?: number;   
}
