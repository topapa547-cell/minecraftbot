const mineflayer = require("mineflayer");

const HOST = process.env.MC_HOST || "Suryansh123451.aternos.me";
const PORT = Number(process.env.MC_PORT || 16356);
const BOT_USERNAME = process.env.BOT_USERNAME || "RenderBot";

let bot;
let reconnecting = false;

function startBot() {
  console.log("🚀 Starting Mineflayer bot...");
  console.log(`🌐 Server: ${HOST}:${PORT}`);

  bot = mineflayer.createBot({
    host: HOST,
    port: PORT,
    username: BOT_USERNAME,
    version: false,
    auth: "offline"
  });

  bot.once("spawn", () => {
    console.log("✅ Bot successfully joined the server!");

    bot.chat("Hello! I am online 🤖");
  });

  bot.on("chat", (username, message) => {
    if (username === bot.username) return;

    console.log(`💬 ${username}: ${message}`);

    if (message.toLowerCase() === "bot") {
      bot.chat("Yes bro, I am online! 🤖");
    }
  });

  bot.on("kicked", (reason) => {
    console.log("❌ Bot kicked:", reason);
  });

  bot.on("error", (err) => {
    console.log("⚠️ Minecraft error:", err.message);
  });

  bot.on("end", () => {
    console.log("🔴 Bot disconnected.");

    if (!reconnecting) {
      reconnecting = true;

      console.log("🔄 Reconnecting in 15 seconds...");

      setTimeout(() => {
        reconnecting = false;
        startBot();
      }, 15000);
    }
  });
}

process.on("uncaughtException", (err) => {
  console.log("💥 Uncaught error:", err);
});

process.on("unhandledRejection", (err) => {
  console.log("💥 Unhandled rejection:", err);
});

startBot();
