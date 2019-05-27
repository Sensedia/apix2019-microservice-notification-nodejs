const utils = require('../utils/init');
const { fromPhone, accountSid, authToken } = utils.initValues();

const twilioClient = require('twilio')(accountSid, authToken);

exports.formatMessage = () => {
    return `There are combinations available for the requested kit. To visualize them, access PobreFit.`;
}

exports.sendMessage = async (formattedMessage, userPhone) => {
    try {
        await twilioClient.messages.create({
            body: formattedMessage,
            from: fromPhone,
            to: userPhone
        }).then(message => console.log(`Message Sent! -> SID ${message.sid}`));
    } catch(err){
        console.log(err);
    }
}






