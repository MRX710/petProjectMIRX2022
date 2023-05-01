export interface IUser {
   id: string | number
   username: string
}

export interface IUserScheme {
   authData?: IUser;
}
