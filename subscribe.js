const amqp = require('amqplib/callback_api');
const { connectionURL, exchange, queue } = require('./resources/config');
const TwilioService = require('./services/twilioService');

amqp.connect(connectionURL, function (err, conn) {
    if(err){
        console.log(err);
        return; 
    }
    conn.createChannel((err, ch) => {
        if(err){
            console.log(err);
            return; 
        }
        ch.assertExchange(exchange, 'topic', { durable: false });

        ch.assertQueue(queue, { exclusive: true }, (err, q) => {
            if(err){
                console.log(err);
                return; 
            }
            console.log(`[*] Aguardando por mensagens na fila -> ${q.queue}. Para sair, pressione CTRL+C`);
            ch.bindQueue(q.queue, exchange, '');

            ch.consume(q.queue, (msg) => {
                let { to } = msg.properties.headers;
                let receivedContent = msg.content.toString();
                console.log("[x] Recebido -> %s", receivedContent);
                let kit = JSON.parse(receivedContent);
                const formattedMsg = TwilioService.formatMessage(kit);
                console.log(`[*] Preparando para enviar mensagem (${formattedMsg}) para o número ${to}`);
                TwilioService.sendMessage(formattedMsg, to);
            }, { noAck : true });
        });
    })
})