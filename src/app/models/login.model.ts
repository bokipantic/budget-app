export interface User {
    username: string,
    password: string
}

export interface Session {
    username: string,
    first_name: string,
    last_name: string,
    token: string
}

export interface UserLogged {
    username: string,
    first_name: string,
    last_name: string
}