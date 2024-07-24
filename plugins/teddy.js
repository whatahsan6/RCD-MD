const {
    smd,
    sleep
} = require('../lib');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');

let teddyM = { "smd": "asta" };

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
        let teddy = ['❤', '💕', '😻', '🧡', '💛', '💚', '💙', '💜', '🖤', '❣', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥', '💌', '🙂', '🤗', '😌', '😉', '🤗', '😊', '🎊', '🎉', '🎁', '🎈']
        const { key } = await citel.reply(`(\\_/)\n( •.•)\n/>🤍`)
        for (let i = 0; i < teddy.length; i++) {
            await sleep(500);
            await citel.reply(`(\\_/)\n( •.•)\n/>${teddy[i]}`, { edit: key })
        }
    }

    if (match && ytdl.validateURL(match)) {
        const videoUrl = match.trim();
        const info = await ytdl.getInfo(videoUrl);
        const format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
        const audioPath = path.join(__dirname, `${citel.id}.mp3`);

        ffmpeg(ytdl(videoUrl, { format: format }))
            .audioBitrate(128)
            .save(audioPath)
            .on('end', async () => {
                await citel.sendFile(audioPath, 'audio/mp3', { quoted: citel });
                fs.unlinkSync(audioPath); // delete the file after sending
            })
            .on('error', async (err) => {
                await citel.reply(`Error: ${err.message}`);
            });
    } else if (match) {
        await citel.reply('Please provide a valid YouTube URL.');
    }
});
