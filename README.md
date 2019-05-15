# apix2019-notification-nodejs
Versão em node do microserviço de notification para o APIX2019

Como usar:

* A aplicação foi estruturada para usar um container docker. 

1 - Execute o script 'generate-image.sh' para gerar a imagem docker da aplicação, junto com a imagem node;

2 - Entre na pasta 'docker' e edite o arquivo variables.sh com as informações TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN e TWILIO_FROM_PHONE 
com as informações presentes em sua conta do Twilio para que o envio de mensagens seja realizado corretamente;

3- Execute o comando docker-start.sh para iniciar o container da aplicação;

* Use o comando update-notification.sh para atualizar a imagem do docker caso tenha feito alguma alteração de código
* O arquivo docker-compose.yml contém os comandos de geração do docker do rabbitmq
