const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// Render ko active rakhne ke liye webpage
app.get('/', (req, res) => {
    res.send('HackerBot is fully awake and running!');
});
app.listen(process.env.PORT || 3000, () => {
    console.log('Web server is ready.');
});

// Asli Minecraft Bot Code
function startBot() {
    console.log('Bot connection attempt shuru ho raha hai...');
    
    const bot = mineflayer.createBot({
        host: 'chub.aternos.host',           // ✨ Tumhara dynamic host
        port: 16356,                         // ⚠️ Aternos ka diya hua numeric port daal diya!
        username: '247_HackerBot',            
        version: '1.20.4',                   // ⚠️ APNA MINECRAFT VERSION YAHAN SAHI SE LIKHO (e.g. '1.20.1', '1.21')
        auth: 'offline'                      // Direct batado cracked server hai
    });

    bot.on('login', () => {
        console.log('🚀 Booom! Bot successfully server me login ho gaya hai!');
    });

    bot.on('spawn', () => {
        console.log('🤖 Bot successfully world ke andar khada hai!');
    });

    // Auto-reconnect loop agar kick ho jaye
    bot.on('end', (reason) => {
        console.log(`Bot disconnect hua. Reason: ${reason}. 15 seconds me dobara ghusega...`);
        setTimeout(startBot, 15000); 
    });

    bot.on('error', (err) => {
        console.log('⚠️ Error physical catch hua: ', err.message);
    });
}

// Chota buffer taaki web server pehle up ho jaye
setTimeout(startBot, 5000);
