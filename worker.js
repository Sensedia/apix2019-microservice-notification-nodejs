const amqp = require('amqplib/callback_api');
const { connectionURL, queue } = require('./resources/config');
//OBS: Importar arquivo 'twilioService.js'

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
            //TODO - Preparar mensagem para receber a mensagem do RabbitMQ e enviar SMS usando a integração com o Twilio
            
        }, { noAck: true });
    });
});
