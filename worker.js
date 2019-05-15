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
        console.log(`[*] Aguardando por mensagens na fila -> ${queue}. Para sair, pressione CTRL+C`);
        ch.consume(queue, function (msg) {
            let { to } = msg.properties.headers;
            let receivedContent = msg.content.toString();
            console.log("[x] Recebido %s", receivedContent);
            let kit  = JSON.parse(receivedContent);
            const formattedMsg = TwilioService.formatMessage(kit);
            console.log(`[*] Preparando para enviar mensagem (${formattedMsg}) para o número ${to}`);
            TwilioService.sendMessage(formattedMsg, to);
        }, { noAck: true });
    });
});