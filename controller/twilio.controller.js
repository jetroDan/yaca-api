const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

class SMS{
     sendSms(dialcode,number,message){
        client.messages 
        .create({
            body: `${message}`, 
            messagingServiceSid: process.env.TWILIO_SERVICE_SID, 
            to: `${dialcode}${number}` 
        })
        .then(message => console.log(message.sid)) 
    }
    
}


module.exports = new SMS()