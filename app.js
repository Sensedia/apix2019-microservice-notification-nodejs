const amqp = require('amqplib/callback_api');
const { connectionURL, queue } = require('./resources/config');
const { kit, phone } = require('./resources/sample.json');

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
        let msg = JSON.stringify(kit);       
        ch.assertQueue(queue, { durable: false });     
        ch.sendToQueue(queue, new Buffer.from(msg), { headers : { "to" : phone }});
        console.log("[x] Enviado %s", msg);
    });
    setTimeout(function () { conn.close(); process.exit(0) }, 500);
});