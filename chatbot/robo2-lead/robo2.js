// Leitor de QR Code
const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js');
const client = new Client();

// Serviço de leitura do QR Code
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

// Confirmação de conexão
client.on('ready', () => {
    console.log('🌟 Tudo pronto! WhatsApp conectado ao seu salão! ✨');
});

// Inicialização do cliente
client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms));

// Atendimento do salão ✨💇‍♀️
client.on('message', async msg => {
    if (msg.body.match(/(menu|Menu|dia|tarde|noite|oi|Oi|Olá|olá|ola|Ola)/i) && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        const contact = await msg.getContact();
        const name = contact.pushname;
        await client.sendMessage(msg.from, `💖 Olá, ${name.split(" ")[0]}! \n\nSeja bem-vinda. Somos a *Target Touch - Beleza & Estética* 💆‍♀️✨\nSomos especialista em Beleza e Estética.\n\n1️⃣ - Conhecer nosso Serviços 💅\n2️⃣ - Quero ver as Promoções 🎉\n3️⃣ - Quais Benefícios 🌸\n4️⃣ - Quero Agendar 📅\n5️⃣ - Outras dúvidas ❓`);
        await delay(3000);
        await chat.sendStateTyping();
        await delay(5000);
        await client.sendMessage(msg.from, '🎙️ Irei te enviar um áudio com mais detalhes...');
        await delay(3000);
        await chat.sendStateRecording();
        await delay(3000);
        const audio1 = MessageMedia.fromFilePath('./audio1.ogg');
        await client.sendMessage(msg.from, audio1, {sendAudioAsVoice: true});
    }

    if (msg.body === '1' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        const imagem1 = MessageMedia.fromFilePath('./imagem1.png');
        await client.sendMessage(msg.from, imagem1, {caption: ''});
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '🌟 *Nossos serviços incluem:* \n💆‍♀️ Hidratação Profunda \n✂️ Corte Personalizado \n🎨 Coloração & Mechas \n💅 Manicure e Pedicure \n🌸 Design de Sobrancelhas e muito mais!');
    }

    if (msg.body === '2' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '🎉 *Promoções Especiais:* \n💖 *Pacote Cabelos Perfeitos* - Hidratação + Corte + Escova por apenas R$ 149,90! \n🌺 *Para seu Dia-a-Dia* - Pé e Mão + Sobrancelha por R$99,90! \n📅 *Agende agora e garanta seu desconto!*');
    }

    if (msg.body === '3' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '💎 *Benefícios Exclusivos!* \n💖 Atendimento Personalizado. \n🌟 Produtos de alta qualidade. \n✨ Ambiente aconchegante e sofisticado. \n🎀 Soda Italiana da Casa!!!');
    }

    if (msg.body === '4' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '📅 *Agendamentos:* \n💖 Para marcar seu horário, acesse: https://espaco.targettouch.com.br/releases/chatbot/ ou fale conosco pelo WhatsApp! +55 11 98836-4233📲 1198836-4233');
    }

    if (msg.body === '5' && msg.from.endsWith('@c.us')) {
        const chat = await msg.getChat();
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from, '❓ Caso tenha mais dúvidas, entre em contato conosco pelo WhatsApp ou visite nosso site: https://espaco.targettouch.com.br ✨');
    }
});
