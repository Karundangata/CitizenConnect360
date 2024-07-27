import express from 'express'
import cron from 'node-cron'
import { newUser } from './api-v1/emailService/newUserService';
import { forgotPassword } from './api-v1/emailService/forgotPassword';
import { sendOffUser } from './api-v1/emailService/sendOffUser';


const app = express()

cron.schedule('*/5 * * * * *', async () => {    //-> runs after every 5 seconds
 
    await newUser()
    await forgotPassword()
    await sendOffUser()

});



// start the application
app.listen(4001,()=>{
    console.log('backGround Server is up!!...')
})
