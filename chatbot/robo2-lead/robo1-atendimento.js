const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const path = require('path');
const fs = require('fs');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✨💖 Bot está pronto e esperando para encantar! 💖✨');
});

const saudacao = () => {
    const hora = new Date().getHours();
    if (hora < 12) return '🌞 Bom dia, diva!';
    if (hora < 18) return '🌸 Boa tarde, maravilhosa!';
    return '🌙 Boa noite, estrela!';
};

const menuPrincipal = `${saudacao()} 💕 Bem-vinda ao *Target Touch - Beleza & Estética* 💄✨

Escolha uma das opções abaixo digitando o número correspondente:

1️⃣ Quero agendar um horário 📅💇‍♀️  
2️⃣ Brinde do Mês! 🎁✨ #EuQuero  
3️⃣ Quero uma *Soda Italiana* 🥤💖  
4️⃣ Tenho uma dúvida, quero falar com uma atendente 🤳💬  

Ou digite *#sair* para encerrar o atendimento. Estamos aqui para te deixar ainda mais incrível! 💖`;

const menuBrinde = `🎁✨ *Parabéns, rainha!* Você ganhou um *DIAGNÓSTICO CAPILAR GRATUITO*! 👑💆‍♀️

Vamos agendar para cuidar das suas madeixas? 💖  

📸 Enviando seu brinde agora...  

Digite *#menu* a qualquer momento para voltar ao menu principal.`;

const respostasSubmenu = {
    '1': '📅💖 Me conta, qual dia, horário e serviço deseja agendar? Estamos prontas para realçar ainda mais sua beleza! 💇‍♀️✨',
    '2': menuBrinde,
    '3': '💖✨ Venha experimentar nossa refrescante *Soda Italiana* ou se deliciar com o *Café do CEO*, um capuccino com bordas de Nutella! ☕🍫',
    '4': '📞💬 Estamos conectando você com uma de nossas atendentes. Aguarde só um momentinho, linda! ✨💖'
};

const enviarImagensEmSequencia = async (message, imagens) => {
    for (const imagemPath of imagens) {
        if (fs.existsSync(imagemPath)) {
            const imagem = MessageMedia.fromFilePath(imagemPath);
            await client.sendMessage(message.from, imagem);
        } else {
            console.error('⚠ Arquivo não encontrado:', imagemPath);
            await message.reply(`⚠ Ops! O arquivo *${path.basename(imagemPath)}* não foi encontrado. Entre em contato com o suporte. 💖`);
        }
    }
};

client.on('message', async message => {
    const msg = message.body.toLowerCase();

    if (['oi', 'olá', 'bom dia', 'boa tarde', 'boa noite'].some(sauda => msg.includes(sauda))) {
        message.reply(menuPrincipal);
    } else if (Object.keys(respostasSubmenu).includes(msg)) {
        message.reply(respostasSubmenu[msg]);

        if (msg === '2') { // Se a opção escolhida for o brinde
            const imagens = [
                path.join(__dirname, 'diag1.jpg'),
                path.join(__dirname, 'diag2.jpg'),
                path.join(__dirname, 'diag3.jpg'),
                path.join(__dirname, 'diag4.jpg')
            ];
            
            await enviarImagensEmSequencia(message, imagens);
        }
    } else if (msg === '#menu') {
        message.reply(menuPrincipal);
    } else if (msg === '#sair') {
        message.reply('💖 Atendimento encerrado! Sempre que precisar de um toque de beleza, estamos aqui para você. Até breve, diva! 👑✨');
    }
});

client.initialize();
