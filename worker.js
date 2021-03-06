const amqp = require('amqplib/callback_api');
const { connectionURL, queue } = require('./resources/config');
const TwilioService = require('./services/twilioService');

amqp.connect(connectionURL, function (err, conn) {
    if(err){
        console.log(err);
        return;
     }
    conn.createChannel(function (err, ch) {
        if(err){
           console.log(err);
           return;
        }
        ch.assertQueue(queue, { durable: false });
        ch.prefetch(1);
        console.log(`[*] Waiting for messages in queue -> ${queue}. To exit, press CTRL+C`);
        ch.consume(queue, function (msg) {
            let { phone, numberOfCombinationsFound } = JSON.parse(msg.content.toString());
            console.log(`[x] Received - Phone ${phone} | Combinations ${numberOfCombinationsFound}`);
            const formattedMsg = TwilioService.formatMessage(numberOfCombinationsFound);
            console.log(`[*] Getting ready to send message (${formattedMsg}) to the phone number ${phone}`);
            TwilioService.sendMessage(formattedMsg, phone);
        }, { noAck: true });
    });
});
