import {Request, Response } from 'express'
import {v4 as uid} from 'uuid' 
import path from 'path'
import dotenv from 'dotenv'

import { DbHelper } from '../databaseHelpers'
import { Poll } from '../models/pollModels'
import { voteSchema } from '../validation/voteValidation'
import { Votes } from '../models/voteModels'
dotenv.config({path:path.resolve(__dirname,"../../.env")})


// initialize the database helpers
const db = new DbHelper()


export async function addVote(request:Request,response:Response) {
    const id = uid()
    // will limit the choices to be only those inserted into the db using the frontend logic
    const {userId,pollId,choiceMade} = request.body

    const { error } = voteSchema.validate(request.body)

    try{
        if(error){
            return response.status(400).send(error.details[0].message)
        } else {

            await db.exec('addVote',{
                id: id,
                userId:userId,
                pollId:pollId,
                choiceMade:choiceMade
            })


            return response.status(200).send({message:"Congratulations! Your'e vote has been added successfuly!!"})
        }

    } catch(error){
        return response.status(400).send(error)
    }
}


export async function getVotes (request:Request, response:Response){
    // do not remove either the request or the response even though they are not being used!
    try{
        const votes = (await db.get('getVotes')).recordset as Array<Votes>
        console.log(votes)

        if(votes){
            
            return response.status(200).send(votes)
        } else {
            return response.status(200).send({message:'Oops! Looks like the system currently has no votes'})
        }

    } catch(error) {
        return response.status(400).send(error)
    }

}


export async function getSpecificPollVotes (request:Request<{id:string}>,response:Response){
    try{
        const id = request.params.id
        const votes = (await db.exec('getSpecificPollVotes',{
            id:id
        })).recordset as Array<Votes>
        // console.log(vote)

        if (votes){

            return response.status(200).send(votes)


        } else {
            return response.status(200).send({message:"Oops! There is no poll of that id. Review the id and try again?"})
        }


    } catch(error) {
        return response.status(400).send(error)
    }
}


// logic to update a vote
// get the vote made and update its value

export async function updateVote  (request:Request<{id:string}>,response:Response){
    try{
        const id = request.params.id
        const {choiceMade} = request.body

        const vote = (await db.exec('getVote',{
            id:id
        })).recordset[0] as Array<Votes>

        if (vote){

            db.exec('updateVote',{
                id: id,
                choiceMade:choiceMade
            })
 
            response.status(200).send({message:"Your vote has been updated succesfully!"})

        } else {
            response.status(200).send({message:"Oh no! Looks like theres no vote with that id. Review the id and try again?"})
        }


    } catch(error) {
        return response.status(400).send(error)
    }
}


export async function deleteVote (request:Request<{id:string}>,response:Response){
    try{
        const id = request.params.id
        const poll = (await db.exec('getVote',{
            id:id
        })).recordset[0] as Array<Votes>
        
        if (poll){
            await db.exec('deleteVote',{
                id:id
            })

            response.status(200).send({message:"Your vote has been succesfully deleted!"})
            
        } else {
            response.status(200).send({message:"Oh no! Looks like the vote does not exist. Review the id and try again?"})
        }


    } catch(error) {
        return response.status(400).send(error)
    }
}
