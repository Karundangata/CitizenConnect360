import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import path from 'path'
import dotenv from 'dotenv'
import { ExtendedRequest, UserPayload } from '../models/authModels'
dotenv.config({path:path.resolve(__dirname,"../../.env")})


export async function roleBasedToken (request:ExtendedRequest, response:Response, next:NextFunction){
    try{
        // 1.read the token
        const token = request.headers['token'] as string

        // 2.verify the token is present
        if (!token){
            return response.status(401).send({message:"Access forbidden. You need to confirm your Token"})
        } else {
            // 3.read the token
            const decodedToken = jwt.verify(token, process.env.SECRET as string) as UserPayload
            request.info = decodedToken
            // console.log('...')
            // console.log(decodedToken)
            // return response.status(200).send({message:"Wagwan Bazzuuu",decodedToken})

        }

    } catch(error) {
        return response.status(401).send(error)
    }

    next()
    // now put the next function here
} 