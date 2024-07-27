export interface ConfigDetails {
    host: string,
    service: string,
    port: number,
    // secure:boolean,
    auth :{
        user?:string,
        pass?:string 
    }
}