const amqp = require('amqplib/callback_api');
const { connectionURL, exchange } = require('./resources/config');
const { phone, kit } = require('./resources/sample');

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
        const msg = JSON.stringify(kit);
        ch.assertExchange(exchange, 'topic', { durable: false });
        ch.publish(exchange, '', new Buffer.from(msg), { headers: { "to" : phone }});
        console.log('[x] Enviado -> %s', msg);
    });
    setTimeout(function () { conn.close(); process.exit(0) }, 500);
});