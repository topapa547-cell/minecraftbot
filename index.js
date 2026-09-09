const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// Render ko pagal banane ke liye ek dummy webpage setup
app.get('/', (req, res) => {
    res.send('HackerBot is fully awake and running!');
});
app.listen(process.env.PORT || 3000, () => {
    console.log('Web server is ready.');
});

// Asli Minecraft Bot Code
function startBot() {
    const bot = mineflayer.createBot({
        host: 'chub.aternos.host', // ⚠️ Yahan apne Aternos ka IP daal
        port: 25565,                         // Java port hamesha 25565 hota hai
        username: '247_HackerBot',            // Bot ka game name
        version: false                        // Auto-detect version
    });

    bot.on('spawn', () => {
        console.log('🚀 Booom! Bot server ke andar enter kar chuka hai!');
    });

    // Server restart ya crash hone par auto-reconnect hack
    bot.on('end', () => {
        console.log('Bot disconnect hua. 15 seconds me dobara ghusega...');
        setTimeout(startBot, 15000); 
    });

    bot.on('error', (err) => console.log('Error occurred: ', err));
}

startBot();
