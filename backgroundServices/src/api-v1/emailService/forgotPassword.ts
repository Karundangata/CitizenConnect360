import ejs from 'ejs'
import dotenv from 'dotenv'
import path from 'path'
import { User, UserEmail } from '../models/userModels'
import { DbHelper } from '../databaseHelpers'
import { sendEmail } from '../helpers'
dotenv.config({path:path.resolve(__dirname,"../../.env")})


const db = new DbHelper()

// random idea
// could have a column in users called reset time
// whereby each user can only reset a max number of times, e.g 3
// after which its not allowed
export async function forgotPassword(){
    try{        
        // get all the users who havent gotten the welcome email
        let users = (await db.get('getActivatedPasswordReset')).recordset as Array<User>        
        
        // loop through each user, sending the message
        users.forEach( (user)=>{

            // build the message to be sent
            ejs.renderFile("templates/forgot-password.ejs", {
                title:"citizenConnect360!",
                name:user.name,
                password_reset_url : "www.citizenConnect.co.ke",
                company_name:"citizenConnect360"},
                async (err,data)=>{
                    // console.log(data)    //-> confirm ejs is modified
                    // console.log(err)

                    let messageOptions:UserEmail = {
                        to:user.email,
                        from:process.env.MAIL_HOST,
                        subject: "Password reset",
                        html: data
                    }

                    // console.log(messageOptions)
                    sendEmail(messageOptions) 

                    // update emails sent to prevent continous loop
                    await db.exec('updateActivatedPasswordReset',{
                        id:user.id
                    })
    
        })
        // printed to console once all emails have been sent
        console.log('all password reset emails have succesfully been sent out!')
        }
    ) 

    } catch(error) {
        // print if theres any error
        console.log('An error occured:',error)
    }
}