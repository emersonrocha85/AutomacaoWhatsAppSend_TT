const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot está pronto!');
});

const saudacao = () => {
    const hora = new Date().getHours();
    if (hora < 12) return 'Bom dia';
    if (hora < 18) return 'Boa tarde';
    return 'Boa noite';
};

const menuPrincipal = `${saudacao()}! Target Touch - Beleza & Estética.

Por favor, selecione uma opção digitando o número correspondente:

1 - Quero agendar um horário.

2 - Brinde do Mês! #EuQuero.

3 - Quero um Soda Italiana.

4 - Tenho uma dúvida, quero falar com Atendente.

Ou digite #sair para encerrar o atendimento.`;

const menuBrinde = `✨ Seu Brinde é:

-> Parabéns!!! UM DIAGNÓSTICO CAPILAR. Vamos falar?

Digite #menu a qualquer tempo para retornar ao menu.`;

const respostasSubmenu = {
    '1': 'Diga qual horário, qual dia e qual serviço?',
    '2': menuBrinde,
    '3': 'Venha experimentar nossa Soda Italiana ou tomar um Café do CEO de capuccino com bordas de nutella.',
    '4': 'Por favor, aguarde um momento enquanto transferimos para uma de nossas atendentes.'
};

client.on('message', message => {
    const msg = message.body.toLowerCase();

    if (['oi', 'olá', 'bom dia', 'boa tarde', 'boa noite'].some(sauda => msg.includes(sauda))) {
        message.reply(menuPrincipal);
    } else if (Object.keys(respostasSubmenu).includes(msg)) {
        message.reply(respostasSubmenu[msg]);
    } else if (msg === '#menu') {
        message.reply(menuPrincipal);
    } else if (msg === '#sair') {
        message.reply('Atendimento encerrado. Caso precise de mais alguma informação, estamos à disposição.');
    }
});

client.initialize();
