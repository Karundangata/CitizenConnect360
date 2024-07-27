import ejs from 'ejs'
import dotenv from 'dotenv'
import path from 'path'
import { User, UserEmail } from '../models/userModels'
import { DbHelper } from '../databaseHelpers'
import { sendEmail } from '../helpers'
dotenv.config({path:path.resolve(__dirname,"../../.env")})


const db = new DbHelper()


export async function sendOffUser(){
    try{        
        // get all the users who havent gotten the welcome email
        let users = (await db.get('getDeletedUsers')).recordset as Array<User>        
        
        // loop through each user, sending the message
        users.forEach( (user)=>{

            // build the message to be sent
            ejs.renderFile("templates/delete-account.ejs", {
                title:"citizenConnect360!",
                name:user.name,
                confirmation_url : "www.citizenConnect.co.ke",
                company_name:"citizenConnect360"},
                async (err,data)=>{
                    // console.log(data)    //-> confirm ejs is modified
                    // console.log(err)

                    let messageOptions:UserEmail = {
                        to:user.email,
                        from:process.env.MAIL_HOST,
                        subject: "Were sorry to see you go",
                        html: data
                    }

                    // console.log(messageOptions)
                    sendEmail(messageOptions) 

                    // update emails sent to prevent continous loop
                    await db.exec('updateDeletedUsers',{
                        id:user.id
                    })
    
        })
        // printed to console once all emails have been sent
        console.log('all user send off emails have succesfully been sent out!')
        }
    ) 

    } catch(error) {
        // print if theres any error
        console.log('An error occured:',error)
    }
}