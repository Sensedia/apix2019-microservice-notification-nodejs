# apix2019-notification-nodejs :iphone:
Versão em node do microserviço de notification para o APIX2019

### Como executar via docker:

1 - Execute o script 'generate-image.sh', presente na pasta raiz do projeto, para gerar a imagem docker da aplicação, junto com a imagem node;

2 - Entre na pasta 'docker' e edite o arquivo 'variables.sh' com as informações TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN e TWILIO_FROM_PHONE com as informações presentes em sua conta do Twilio para que o envio de mensagens seja realizado corretamente;

3- Execute o script docker-start.sh para iniciar o container da aplicação;

OBS: Caso tenha feito alguma alteração de código, gere novamente a imagem docker usando o comando 'generate-image.sh' e depois use o comando 'update-notification.sh', na pasta 'docker', para subir um novo container. 

### Como executar localmente:

1 - Edite o arquivo '.env' presente dentro do projeto com os valores das variáveis TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN e TWILIO_FROM_PHONE com as informações presentes em sua conta do Twilio para que o envio de mensagens seja realizado corretamente;

2 - Edite o arquivo 'config.json', presente na pasta 'resources', e altere o valor do atributo 'connectionURL' de `amqp://rabbitmq:5672` para `amqp://localhost:5672`;

3 - No terminal, entre na pasta do projeto e execute o comando 'npm start'.

### Como fazer debug da aplicação:

1 - Realizar os passos da seção "Como usar localmente";

2 - No Visual Studio, apertar as teclas 'Ctrl+Shift+D', e próximo do campo 'Launch Program' clicar no icone da engrenagem (Open launch.json);

3 - No arquivo mostrado depois de clicar no icone anterior, mudar o valor do atributo "program" para '${workspaceFolder}/worker.js'


