export interface IUserToken{
    token: string,
    user: IUser
}

export interface IUser{
    username: string,
}

export interface IRequestUser{
    username: string,
    password: string
}