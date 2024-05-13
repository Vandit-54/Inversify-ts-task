export interface IUser {
    name: string;
    username: string;
    email: string;
    password: string;
    phonenumber: number;
    accessToken?():string;
    role?:string;
}
