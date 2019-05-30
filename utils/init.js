const dotenv = require('dotenv');
const { parsed: envs } = dotenv.config();

exports.initValues = () => {
    return { 
        fromPhone : process.env.TWILIO_FROM_PHONE || envs.TWILIO_FROM_PHONE,
        accountSid : process.env.TWILIO_ACCOUNT_SID || envs.TWILIO_ACCOUNT_SID,
        authToken : process.env.TWILIO_AUTH_TOKEN || envs.TWILIO_AUTH_TOKEN
    }
}