import {Request} from 'express'

// create an enum for user roles
export enum Roles {
    Citizen = 'citizen',
    Official = 'official',
    Admin = 'admin'
}

export interface User{
    id:string,
    name:string,
    email:string,
    password:string,
    role:string,
    avatar?:string,
    isEmailSent?:number, //set property to optional
    isDeleted?:number,  //set property to optional
    awaitApproval?:number
}

export interface UserPayload{
    id: string,
    name: string,
    email:string,
    role:string
}

export interface ExtendedRequest extends Request{
    info?: UserPayload
}

