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

const menuPrincipal = `${saudacao()}! Bem-vinda ao Glam Luxos - Seu salão de beleza.

Por favor, selecione uma opção digitando o número correspondente:

1 - AGENDAR HORÁRIO
2 - CONHECER NOSSOS SERVIÇOS
3 - PROMOÇÕES
4 - FALAR COM ATENDENTE

Ou digite #sair para encerrar o atendimento.`;

const menuServicos = `✨ Serviços disponíveis no Glam Luxos:

1 - Corte e escova
2 - Hidratação e tratamento capilar
3 - Coloração e mechas
4 - Alongamento de unhas
5 - Maquiagem profissional

Digite #menu a qualquer tempo para retornar ao menu.`;

const respostasSubmenu = {
    '1': 'Para agendar seu horário, entre em contato pelo nosso WhatsApp ou visite nosso site: https://www.glamluxos.com.br',
    '2': menuServicos,
    '3': 'Confira nossas promoções especiais em nosso Instagram @glamluxos ou em nosso site.',
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
