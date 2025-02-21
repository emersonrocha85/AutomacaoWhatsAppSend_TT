const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const path = require('path');
const fs = require('fs');

const client = new Client({
    authStrategy: new LocalAuth()
});

let interacoesRecentes = new Map();
const TEMPO_BLOQUEIO = 2 * 60 * 60 * 1000; // 2 horas em milissegundos

const horarioAtendimento = { inicio: 8, fim: 20 };

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

Ou digite *sair*, *voltar* ou *menu* para retornar ao início. Estamos aqui para te deixar ainda mais incrível! 💖`;

const menuBrinde = `🎁✨ *Parabéns, rainha!* Você ganhou um *DIAGNÓSTICO CAPILAR GRATUITO*! 👑💆‍♀️

Vamos agendar para cuidar das suas madeixas? 💖  

📸 Enviando seu brinde agora...  

Digite *menu* a qualquer momento para voltar ao menu principal.`;

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

const estaDentroDoHorario = () => {
    const horaAtual = new Date().getHours();
    return horaAtual >= horarioAtendimento.inicio && horaAtual < horarioAtendimento.fim;
};

client.on('message', async message => {
    const msg = message.body.toLowerCase().trim();
    const usuario = message.from;

    if (!estaDentroDoHorario()) {
        return message.reply('⏳💖 Oi, linda! Nosso atendimento funciona das 08h00 às 20h00. Volte nesse horário para agendar sua transformação! ✨💇‍♀️');
    }

    if (['oi', 'olá', 'bom dia', 'boa tarde', 'boa noite'].some(sauda => msg.includes(sauda))) {
        if (interacoesRecentes.has(usuario) && Date.now() - interacoesRecentes.get(usuario) < TEMPO_BLOQUEIO) {
            return;
        }
        interacoesRecentes.set(usuario, Date.now());
        return message.reply(menuPrincipal);
    }

    if (Object.keys(respostasSubmenu).includes(msg)) {
        message.reply(respostasSubmenu[msg]);
        if (msg === '2') {
            const imagens = [
                path.join(__dirname, 'diag1.jpg'),
                path.join(__dirname, 'diag2.jpg'),
                path.join(__dirname, 'diag3.jpg'),
                path.join(__dirname, 'diag4.jpg')
            ];
            await enviarImagensEmSequencia(message, imagens);
        }
    } else if (['sair', 'voltar', 'menu'].includes(msg)) {
        message.reply(menuPrincipal);
    }
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✨💖 Bot está pronto e esperando para encantar! 💖✨');
});

client.initialize();
