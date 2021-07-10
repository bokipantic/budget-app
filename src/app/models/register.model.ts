export interface User {
    username: string,
    password: string,
    first_name: string,
    last_name: string
}

export interface NewUser {
    id: string,
    username: string,
    first_name: string,
    last_name: string,
    token: string
}