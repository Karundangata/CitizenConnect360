
export interface UserEmail{
    to:string,
    from?:string,   
    subject: string,
    html?: string   
}


export interface User{
    id:string,
    name:string,
    email:string,
    password:string,
    role:string,
    avatar?:string,
    isEmailSent?:number, 
    isDeleted?:number,  
    awaitApproval?:number
}