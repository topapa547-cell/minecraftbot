const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// Render Web Application ko 24/7 jagaye rakhne ke liye webpage
app.get('/', (req, res) => {
    res.send('HackerBot is fully awake and running!');
});
app.listen(process.env.PORT || 3000, () => {
    console.log('Web server is ready.');
});

// Asli Minecraft Hacker Bot Code
function startBot() {
    console.log('🚀 Connecting to Aternos via Port Bypass...');

    const bot = mineflayer.createBot({
        host: 'Suryansh123451.aternos.me', // ✨ Main server address (DynIP mat dalo)
        port: 25565,                        // ⚠️ Java connection ke liye hamesha 25565 rakho
        username: '247_HackerBot',          // Bot ka in-game naam
        version: '1.20.4',                  // ⚠️ APNA GAME VERSION YAHAN BADAL DENA (e.g., '1.20.1', '1.21' etc.)
        auth: 'offline',                    // Cracked configuration bypass
        checkTimeoutInterval: 60000         // Connection timeout delay hack
    });

    bot.on('login', () => {
        console.log('💚 Success: Bot Aternos panel me authenticate ho gaya hai!');
    });

    bot.on('spawn', () => {
        console.log('🎮 BOOOM! Bot successfully server me ghus gaya aur online khada hai!');
    });

    bot.on('end', (reason) => {
        console.log(`🔌 Connection Lost due to: ${reason}. Retrying in 10 seconds...`);
        setTimeout(startBot, 10000); // 10 seconds auto-reconnect trigger
    });

    bot.on('error', (err) => {
        console.log('❌ Catch Error Log: ', err.message);
    });
}

// 5 second ka pause taaki pehle Render ka web service stable ho jaye
setTimeout(startBot, 5000);
