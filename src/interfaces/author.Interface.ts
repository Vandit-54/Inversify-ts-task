export interface IAuthor {
    name: string;
    email:string;
    password:string;
    biography: string;
    nationality: string;
    accessToken?():string;
}