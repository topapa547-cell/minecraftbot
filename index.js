const mineflayer = require("mineflayer");
const http = require("http");

const HOST = process.env.MC_HOST || "Suryansh123451.aternos.me";
const PORT = Number(process.env.MC_PORT || 16356);
const BOT_USERNAME = process.env.BOT_USERNAME || "RenderBot";

// Render Web Service ko port chahiye
const WEB_PORT = Number(process.env.PORT || 10000);

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/plain"
    });

    res.end("Mineflayer bot is running! 🤖\n");
});

server.listen(WEB_PORT, "0.0.0.0", () => {
    console.log(`🌐 Web server listening on port ${WEB_PORT}`);
});

let bot = null;
let reconnectTimer = null;

function startBot() {
    console.log("");
    console.log("================================");
    console.log("🚀 Starting Mineflayer bot...");
    console.log(`🌐 Minecraft: ${HOST}:${PORT}`);
    console.log(`🤖 Username: ${BOT_USERNAME}`);
    console.log("================================");

    bot = mineflayer.createBot({
        host: HOST,
        port: PORT,
        username: BOT_USERNAME,
        auth: "offline",
        version: false,
        connectTimeout: 30000
    });

    bot.once("spawn", () => {
        console.log("================================");
        console.log("✅ BOT JOINED MINECRAFT!");
        console.log(`🤖 ${bot.username} is online!`);
        console.log("================================");

        setTimeout(() => {
            if (bot) {
                bot.chat("Hello! I am online 🤖");
            }
        }, 3000);
    });

    bot.on("login", () => {
        console.log("🔐 Minecraft login successful.");
    });

    bot.on("error", (err) => {
        console.log(`⚠️ Minecraft error: ${err.code || err.message}`);
    });

    bot.on("kicked", (reason) => {
        console.log("❌ Bot kicked:", reason);
    });

    bot.on("end", () => {
        console.log("🔴 Bot disconnected.");

        if (!reconnectTimer) {
            console.log("🔄 Reconnecting in 15 seconds...");

            reconnectTimer = setTimeout(() => {
                reconnectTimer = null;
                startBot();
            }, 15000);
        }
    });
}

// Crash protection
process.on("uncaughtException", (err) => {
    console.log("💥 Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
    console.log("💥 Unhandled Rejection:", err);
});

startBot();
