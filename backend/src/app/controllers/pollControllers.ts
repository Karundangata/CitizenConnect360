import {Request, Response } from 'express'
import {stringify, v4 as uid} from 'uuid' 
import path from 'path'
import dotenv from 'dotenv'

import { DbHelper } from '../databaseHelpers'
import { pollSchema } from '../validation/pollValidation'
import { Poll } from '../models/pollModels'
dotenv.config({path:path.resolve(__dirname,"../../.env")})


// initialize the database helpers
const db = new DbHelper()


export async function addPoll(request:Request,response:Response) {
    const id = uid()
    const {title,userId,choices} = request.body
    const choicesString = choices.join(",") //convert choices array into a CSV for storage in DB with NVARCHAR(max)
    // console.log(choices)
    // console.log(choicesString)

    const { error } = pollSchema.validate(request.body)

    try{
        if(error){
            // return response.status(400).send(error.details[0].message)
            // return response.status(400).send(error)
            return response.status(400).send(error.details[0].message)
        } else {

            await db.exec('addPoll',{
                id: id,
                userId:userId,
                title:title,
                choices:choicesString
            })


            return response.status(200).send({message:"Congratulations! You have succesfully created a new poll"})
        }

    } catch(error){
        return response.status(400).send(error)
    }
}


export async function getPolls (request:Request, response:Response){
    // do not remove either the request or the response even though they are not being used!
    try{
        const polls = (await db.get('getpolls')).recordset as Array<Poll>

        if(polls){
            
            return response.status(200).send(polls)
        } else {
            return response.status(200).send({message:'Oops! Looks like the system currently has no polls'})
        }

    } catch(error) {
        return response.status(400).send(error)
    }

}


export async function getPoll (request:Request<{id:string}>,response:Response){
    try{
        const id = request.params.id
        const poll = (await db.exec('getPoll',{
            id:id
        })).recordset as Array<Poll>
        console.log(poll[0].choices)

        // looking for a way to split up the choices string on the commas
        // const pollChoices = JSON.stringify(poll[0].choices).split
        // console.log('......')
        // console.log(pollChoices)

        if (poll){

            return response.status(200).send(poll)


        } else {
            return response.status(200).send({message:"Oops! There is no existing poll of that id. Review the id and try again?"})
        }


    } catch(error) {
        return response.status(400).send(error)
    }
}

// will change isOpen to 0
export async function closePoll  (request:Request<{id:string}>,response:Response){
    try{
        const id = request.params.id

        const poll = (await db.exec('getPoll',{
            id:id
        })).recordset[0] as Array<Poll>


        if (poll){

            db.exec('closePoll',{
                id:id
            })

            response.status(200).send({message:"The poll has now been successfully closed!"})

        } else {
            response.status(200).send({message:"Oh no! Looks like the poll does not exist. Review the id and try again?"})
        }


    } catch(error) {
        return response.status(400).send(error)
    }
}



export async function deletePoll (request:Request<{id:string}>,response:Response){
    try{
        const id = request.params.id
        const poll = (await db.exec('getPoll',{
            id:id
        })).recordset[0] as Array<Poll>
        
        if (poll){
            await db.exec('deletePoll',{
                id:id
            })

            response.status(200).send({message:"The poll has been deleted succesfully!"})
            
        } else {
            response.status(200).send({message:"Oh no! Looks like the poll does not exist. Review the id and try again?"})
        }


    } catch(error) {
        return response.status(400).send(error)
    }
}
