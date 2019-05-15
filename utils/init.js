exports.initValues = () => {
    return { 
        fromPhone : process.env.TWILIO_FROM_PHONE,
        accountSid : process.env.TWILIO_ACCOUNT_SID,
        authToken : process.env.TWILIO_AUTH_TOKEN
    }
}