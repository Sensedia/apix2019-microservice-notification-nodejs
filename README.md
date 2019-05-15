# apix2019-notification-nodejs
Versão em node do microserviço de notification para o APIX2019

Como usar:

1- Antes de iniciar a aplicação, certifique-se de ter um ambiente RabbitMQ instalado em sua máquina. 
Caso utilize docker, é possível iniciar uma instância de RabbitMQ localmente usando o seguinte comando:

docker run -d --hostname my-rabbit --name rabbit13 -p 9090:15672 -p 5672:5672 -p 25676:25676 rabbitmq:3-management

2- Dentro da pasta do projeto, em /resources, existe um arquivo 'config.json'. Será necessário editar as informações, accountSid e authToken com as informações presentes em sua conta do Twilio para que o envio de mensagens seja realizado corretamente;

3- Caso necessário, altere o nome da fila que recebe as mensagens do RabbitMQ no atributo 'queue';

3- Inicialize o consumer de mensagens da fila com o comando 'npm run worker'; 
