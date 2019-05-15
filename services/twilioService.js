const {accountSid, authToken, fromPhone} = require('../resources/config.json');
const twilioClient = require('twilio')(accountSid, authToken);

exports.formatMessage = (kit) => {
    const { name, url } = kit;
    return `Há combinações disponíveis para o Kit "${name}". Para visualizá-las, acesse ${url}`;
}

exports.sendMessage = async (formattedMessage, userPhone) => {
    try {
        await twilioClient.messages.create({
            body: formattedMessage,
            from: fromPhone,
            to: userPhone
        }).then(message => console.log(`Mensagem enviada! -> SID ${message.sid}`));
    } catch(err){
        console.log(err);
    }
}


