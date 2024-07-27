import {Request, Response } from 'express'
import {v4 as uid} from 'uuid' 
import path from 'path'
import dotenv from 'dotenv'

import { DbHelper } from '../databaseHelpers'
import { viewSchema } from '../validation/viewValidation'
import { View } from '../models/viewModels'
dotenv.config({path:path.resolve(__dirname,"../../.env")})


// initialize the database helpers
const db = new DbHelper()


export async function addView(request:Request,response:Response) {
    const id = uid()
    const {title,description,body,location,userId,imageUrl} = request.body

    const { error } = viewSchema.validate(request.body)

    try{
        if(error){
            return response.status(400).send(error.details[0].message)
        } else {

            await db.exec('addView',{
                id: id,
                title:title,
                description:description,
                body:body,
                location:location,
                userId:userId,
                imageUrl:imageUrl
            })


            return response.status(200).send({message:"Congratulations! You have succesfully created a new view"})
        }

    } catch(error){
        return response.status(400).send(error)
    }
}


export async function getViews (request:Request, response:Response){
    // do not remove either the request or the response even though they are not being used!
    try{
        const views = (await db.get('getViews')).recordset as Array<View>

        if(views){
            
            return response.status(200).send(views)
        } else {
            return response.status(200).send({message:'Oops! Looks like the system currently has no views'})
        }

    } catch(error) {
        return response.status(400).send(error)
    }

}


export async function getView (request:Request<{id:string}>,response:Response){
    try{
        const id = request.params.id
        const view = (await db.exec('getView',{
            id:id
        })).recordset[0] as Array<View>
        // console.log(view)

        if (view){

            return response.status(200).send(view)


        } else {
            return response.status(200).send({message:"Oops! There no existing view of that id. Review the id and try again?"})
        }


    } catch(error) {
        return response.status(400).send(error)
    }
}

// will change isModified to 1
export async function updateView  (request:Request<{id:string}>,response:Response){
    try{
        const id = request.params.id
        const {title,description,body,location,userId,imageUrl} = request.body

        const view = (await db.exec('getView',{
            id:id
        })).recordset[0] as Array<View>


        if (view){

            db.exec('updateview',{
                id: id,
                title:title,
                description:description,
                body:body,
                location:location,
                userId:userId,
                imageUrl:imageUrl
            })

            response.status(200).send({message:"The view has been updated succesfully!"})

        } else {
            response.status(200).send({message:"Oh no! Looks like the view does not exist. Review the id and try again?"})
        }


    } catch(error) {
        return response.status(400).send(error)
    }}



export async function deleteView (request:Request<{id:string}>,response:Response){
    try{
        const id = request.params.id
        const view = (await db.exec('getView',{
            id:id
        })).recordset[0] as Array<View>
        
        if (view){
            await db.exec('deleteView',{
                id:id
            })

            response.status(200).send({message:"The view has been deleted succesfully!"})
            
        } else {
            response.status(200).send({message:"Oh no! Looks like the view does not exist. Review the id and try again?"})
        }


    } catch(error) {
        return response.status(400).send(error)
    }
}

export async function sensorView (request:Request<{id:string}>,response:Response){
    try{
        const id = request.params.id
        const view = (await db.exec('getView',{
            id:id
        })).recordset[0] as Array<View>
        // console.log(view)

        if (view){
            db.exec('sensorView',{
                id:id
            })
            return response.status(200).send({message:"The view has been sensored succesfully"})
        } else {
            return response.status(200).send({message:"Oh no! There is no view with that given id. Review and try again?"})

        }


    } catch(error){
        return response.status(400).send(error)
    }
}


