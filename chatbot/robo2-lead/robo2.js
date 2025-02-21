const qrcode = require('qrcode-terminal');
const { Client, MessageMedia } = require('whatsapp-web.js');
const client = new Client();

// Serviço de leitura do QR Code
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

// Confirmação de conexão
client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado ao Target Touch - Beleza & Estética.');
});

client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms));

// Fluxo de vendas - Target Touch
client.on('message', async msg => {
    if (msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola)/i) && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        const contact = await msg.getContact();
        const name = contact.pushname.split(" ")[0];

        await delay(2000);
        await chat.sendStateTyping();
        await delay(2000);
        await client.sendMessage(msg.from, `
            ✨ Olá, *${name}*! Seja bem-vinda ao *Target Touch - Beleza & Estética*! 💆‍♀️💅
            
            Queremos te proporcionar a melhor experiência! Antes de começarmos, me conta:
            
            1️⃣ Quero um novo visual 💇‍♀️
            2️⃣ Quero cuidar melhor do meu cabelo 💆‍♀️
            3️⃣ Quero saber as promoções do mês 🎉
            4️⃣ Quero agendar um horário 📅
            5️⃣ Quero um brinde especial 🎁
        `);
    }

    if (msg.body === '1' && msg.from.endsWith('@c.us')) {
        await delay(2000);
        await client.sendMessage(msg.from, `💇‍♀️ *Transforme seu visual com a gente!* 
        Temos cortes modernos, coloração, mechas e muito mais para realçar sua beleza! 
        
        📸 Dá uma olhada no nosso trabalho no Instagram: @espaco_targettouch
        📅 [Agende seu horário aqui](https://wa.me/5511988364233)`);
    }

    if (msg.body === '2' && msg.from.endsWith('@c.us')) {
        await delay(2000);
        await client.sendMessage(msg.from, `💆‍♀️ *Seu cabelo merece o melhor!* 
        Trabalhamos com hidratação profunda, cronograma capilar e tratamentos exclusivos para cada tipo de fio.
        
        🎁 *Promoção especial:* Agende uma nutrição capilar e ganhe uma massagem relaxante!
        📅 [Agende aqui](https://wa.me/5511988364233)`);
    }

    if (msg.body === '3' && msg.from.endsWith('@c.us')) {
        await delay(2000);
        await client.sendMessage(msg.from, `🎉 *Promoções do mês!* 🎉
        ✂️ Corte + Hidratação: *R$ 99,90*
        💆‍♀️ Escova + Nutrição: *R$ 79,90*
        💅 Pé + Mão + Esfoliação: *R$ 49,90*
        
        📅 [Garanta já sua vaga!](https://wa.me/5511988364233)`);
    }

    if (msg.body === '4' && msg.from.endsWith('@c.us')) {
        await delay(2000);
        await client.sendMessage(msg.from, '📅 *Agendamentos*: Faça seu agendamento rápido e fácil pelo WhatsApp clicando aqui: [Agendar](https://wa.me/5511988364233) ou pelo site: https://espaco.targettouch.com.br/');
    }

    if (msg.body === '5' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(2000);
        await chat.sendStateTyping();
        await delay(2000);
        const diag1 = MessageMedia.fromFilePath('./diag1.jpg');
        const diag2 = MessageMedia.fromFilePath('./diag2.jpg');
        const diag3 = MessageMedia.fromFilePath('./diag3.jpg');

        await client.sendMessage(msg.from, diag1, { caption: '🎁 *Presente pra você!* Ganhe um *diagnóstico capilar gratuito* para cuidar melhor dos seus cabelos! 🌟' });
        await delay(2000);
        await client.sendMessage(msg.from, diag2);
        await delay(2000);
        await client.sendMessage(msg.from, diag3);
    }
});

// Impedir que o bot pare de responder ao interagir manualmente pelo celular
client.on('message_create', async msg => {
    if (!msg.fromMe) return;
    await client.sendMessage(msg.to, '🤖 O assistente virtual está ativo! Caso precise de atendimento humano, nos avise.');
});
