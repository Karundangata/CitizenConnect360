import { ConnectionPool, Request } from "mssql";
import mssql from 'mssql'
import { sqlConfig } from "../../config";


export class DbHelper{ 
    // make the request to the db
    private pool :Promise<ConnectionPool>
    constructor() {

        // connect to db. once only
        this.pool= mssql.connect(sqlConfig) 
    }

    // add inputs if any
    private createRequest(emptyRequest:Request, data:{[x:string]: string|number}){

        const keys = Object.keys(data)
        keys.map(key=>{
            emptyRequest.input(key, data[key])
        })
        return emptyRequest
    }

    //execute procedure with inputs
    async exec(storedprocedure:string, data:{[x:string]: string|number}){
        //make a request
        const emptyRequest= (await this.pool).request()
        const request=this.createRequest(emptyRequest,data)
        let results= (await request.execute(storedprocedure))
        return results
    }
    
    // run an storeed procedure with no inputs
    async get(storedProcedure: string) {
        const request = (await this.pool).request();
        const results = await request.execute(storedProcedure);
        return results;
      }
}

