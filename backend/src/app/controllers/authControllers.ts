import {Request, Response } from 'express'
import {v4 as uid} from 'uuid' 
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import path from 'path'
import dotenv from 'dotenv'

import { DbHelper } from '../databaseHelpers'
import { changePasswordSchema, forgotPasswordSchema, registerSchema } from '../validation/authValidation'
import { Roles, User, UserPayload } from '../models/authModels'
dotenv.config({path:path.resolve(__dirname,"../../.env")})


// initialize the database helpers
const db = new DbHelper()


export async function registerUser(request:Request,response:Response) {
    const id = uid()
    const role = Roles.Citizen   //change when you need to add admin
    const {name,email,password,acceptTos} = request.body

    // abort early false ensure entire body is authenticated, despite error on the first one
    // then returns all the error at once
    // doesnt work for now.check on it
    const { error } = registerSchema.validate(request.body, {
        abortEarly:false,
    })

    try{
        if(error){
            return response.status(400).send(error.details[0].message)
        } else {
            //encrypt password using salts. below 10 to save on time
            const hashedPassword = await bcrypt.hash(password,9)    
            
            await db.exec('addUser',{
                id: id,
                name:name,
                email: email,
                password:hashedPassword,
                role:role   //hard coded to an admin to create an admin user. then change to normal
            })

            // for sending token to frontend. allow security
            const payload:UserPayload = {
                id: id,
                name: name,
                email: email,
                role: role
            }

            return response.status(200).send({message:"Congratulations! You have succesfully created a new account"})
        }

    } catch(error){
        return response.status(400).send(error)
    }
}


// log in the user
export async function loginUser (request:Request, response:Response){
    try{
        const {email,password} = request.body
        const user = (await db.exec('getUserByEmail',{
            email:email
        })).recordset as Array<User>   
        /* 
        recordset gets all users in the array -> use as Array<User>
        recordset[0] gets user indexed 1 in the array -> use as User
        here it is better to use recordset[0] as youre only getting one user
        but it returns an error. to be resolved
        */
        // console.log(user)

        // if the user exists due to email matching
        if(user){
          
            const isValid = await bcrypt.compare(password,user[0].password)
            
            if(isValid){
                // to be passed to the token
                const payload:UserPayload = {
                    id: user[0].id,
                    name: user[0].name,
                    email:user[0].email,
                    role: user[0].role
                }

                const token = jwt.sign(payload,process.env.SECRET as string,{expiresIn:'20d'})
                const decodedToken = jwt.verify(token, process.env.SECRET as string) as UserPayload
                // console.log(token)
                

                // return response.status(200).send({message:"login successful!"})
                // above works well. but need to pass token to allow for roleBased authentication
                return response.status(200).send({message:"You have succesfully logged in!",token:token,decodedToken:decodedToken})
            } else{
                // instance wherby the email matches. but incorrect password
                return response.status(400).send({message:"Ohh no! Seems like you entered an invalid password.try again?"})
            }
        }

    } catch(error){
        //for instances whereby the email doesnt exist
        return response.status(400).send({message:"Ohh no! Seems like the email entered does not exist.Try a different email?"})
    }
} 

// user intentionally wants to change password
export async function changePassword (request:Request<{id:string}>, response:Response){
    
    const id = request.params.id
    const {newPassword, confirmNewPassword} = request.body
    const { error } = changePasswordSchema.validate(request.body)

    try{
        if(error){
            return response.status(400).send(error.details[0].message)
        } else {

            const user = (await db.exec('getUserById',{
                id:id
            })).recordset as Array<User>
    
            // console.log(user[0])
    
            // if the user exists
            if(user){
    
                // create new hashed password
                const newHashedPassword = await bcrypt.hash(confirmNewPassword,9)
    
                await db.exec('updatePassword',{
                    id: user[0].id,
                    password:newHashedPassword,
                })
               

                return response.status(200).send({message:"Congratulations! You have updated your password succesfully"})
              
            } else {
                return response.status(400).send({message:"Oh no! Looks like we could not find a user with that id. Review the id and try again?"}) 
            }
    
        }
    } catch(error){
        return response.status(400).send(error)
    }
}


// user forgot old password an is now reseting a new one
export async function forgotPassword (request:Request, response:Response){
    
    const {email} = request.body
    const { error } = forgotPasswordSchema.validate(request.body)

    try{
        if(error){
            return response.status(400).send(error.details[0].message)
        } else {

            const user = (await db.exec('getUserByEmail',{
                email:email
            })).recordset as Array<User>
    
            // console.log(user[0])
    
            // if the user exists
            if(user){
    
                await db.exec('activatePasswordReset',{
                    id: user[0].id
                })

                return response.status(200).send({message:"Congratulations! A password reset link will be sent to you shortly"})
    
            } else {
                return response.status(400).send({message:"Oops! Looks like that user doesn't exist. Try again?"}) 
            }
    
        }
    } catch(error){
        return response.status(400).send(error)
    }
}


export async function getUsers (request:Request, response:Response){
    // do not remove either the request or the response even though they are not being used!
    try{
        const users = (await db.get('getUsers')).recordset as Array<User>

        if(users){
            
            return response.status(200).send(users)
        } else {
            return response.status(200).send({message:'Oops! Looks like the system currently has no users'})
        }

    } catch(error) {
        return response.status(400).send(error)
    }

}


export async function getUserById (request:Request<{id:string}>,response:Response){
    try{
        const id = request.params.id
        const user = (await db.exec('getUserById',{
            id:id
        })).recordset[0] as Array<User>
        // console.log(user)

        if (user ){
            return response.status(200).send(user)

        } else {
            return response.status(200).send({message:"Oops! Looks like that user doesn't exist. Review the id and try again?"})
        }


    } catch(error) {
        return response.status(400).send(error)
    }
}

export async function getUserByEmail (request:Request,response:Response){
    const {email} = request.body

    try{
        const user = (await db.exec('getUserByEmail',{
            email:email
        })).recordset[0] as Array<User>
        console.log(user)

        if (user ){
            return response.status(200).send(user)

        } else {
            return response.status(200).send({message:"Oops! Looks like that user doesn't exist. Review the email and try again?"})
        }


    } catch(error) {
        return response.status(400).send(error)
    }
}


export async function updateUser  (request:Request<{id:string}>,response:Response){
    try{
        const id = request.params.id
        const {name,email,password} = request.body
        const role = Roles.Citizen     //change if admin needs to update themselves

        const user = (await db.exec('getUserById',{
            id:id
        })).recordset[0] as Array<User>


        if (user){
            const hashedPassword = await bcrypt.hash(password, 9)

            db.exec('updateUser',{
                id: id,
                name: name,
                email:email,
                password:hashedPassword,
                role:role
            })

            response.status(200).send({message:"The user has been updated succesfully!"})

        } else {
            response.status(200).send({message:"Oh no! Looks like the user does not exist. Review the id and try again?"})
        }


    } catch(error) {
        response.status(400).send(error)
    }
}



export async function deleteUser (request:Request<{id:string}>,response:Response){
    try{
        const id = request.params.id
        const user = (await db.exec('getUserById',{
            id:id
        })).recordset[0] as Array<User>
        
        if (user){
            await db.exec('deleteUser',{
                id:id
            })

            response.status(200).send({message:"The user has been deleted succesfully!"})
            
        } else {
            response.status(200).send({message:"Oh no! Looks like the user does not exist. Review the id and try again?"})
        }


    } catch(error) {
        response.status(400).send(error)
    }
}


