const { smd, sleep } = require('../lib');
const teddyM = { "smd": "asta" };

smd({
    cmdname: "teddy",
    type: "fun",
    info: "cute teddy",
    on: "text",
    filename: __filename,
}, async (citel, match, { smd }) => {
    let isteddy = smd === "teddy" ? true : citel.isPublic && match.toLowerCase().includes("teddy") ? true : "";
    if (isteddy && !teddyM[citel.id]) {
        teddyM[citel.id] = true;
        let teddy = ['❤', '💕', '😻', '🧡', '💛', '💚', '💙', '💜', '🖤', '❣', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥', '💌', '🙂', '🤗', '😌', '😉', '🤗', '😊', '🎊', '🎉', '🎁', '🎈'];
        const { key } = await citel.reply(`(\\_/)\n( •.•)\n/>🤍`);
        for (let i = 0; i < teddy.length; i++) {
            await sleep(500);
            await citel.reply(`(\\_/)\n( •.•)\n/>${teddy[i]}`, { edit: key });
        }
    }
});

// Function to send a voice message
async function sendVoiceMessage(citel) {
    const mediaUrl = 'https://github.com/purnapurna2007/Audio-mp3/raw/main/Audio/hmmm.mp3';

    // Assuming citel.sendMessage is the method to send media messages
    await citel.sendMessage(citel.from, { audio: { url: mediaUrl }, mimetype: 'audio/mp4' });

    console.log('Voice message sent successfully');
}

// Replace this function call with your actual message receiving logic
async function onMessageReceived(citel) {
    if (citel.body.toLowerCase() === 'hi') {
        await sendVoiceMessage(citel);
    }
}

// Simulate message received event
onMessageReceived({ body: 'hi', from: 'recipient-phone-number', sendMessage: (to, message) => console.log(`Message sent to ${to}:`, message) });
