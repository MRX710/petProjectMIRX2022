export interface IUser {
   id: string | number
   username: string
   avatar?: string
}

export interface IUserScheme {
   authData?: IUser;
}
