const mineflayer = require("mineflayer");
const http = require("http");

// Configuration via environment variables with defaults
const HOST = process.env.MC_HOST || "topapa12-ATsD.aternos.me";
const PORT = Number(process.env.MC_PORT || 64153);
const BOT_USERNAME = process.env.BOT_USERNAME || "RenderBot";
const WEB_PORT = Number(process.env.PORT || 10000);

let bot = null;
let reconnectTimer = null;
let antiAfkInterval = null;
let botStatus = {
    connected: false,
    lastSpawn: null,
    lastAction: null,
    antiAfkActive: false
};

// 🌐 HTTP Web Server (Keeps Render/Koyeb awake with UptimeRobot)
const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
        status: "running",
        uptimeSeconds: Math.floor(process.uptime()),
        targetServer: `${HOST}:${PORT}`,
        botUsername: BOT_USERNAME,
        bot: botStatus
    }, null, 2));
});

server.listen(WEB_PORT, "0.0.0.0", () => {
    console.log(`🌐 Web server listening on port ${WEB_PORT} (Use this URL on UptimeRobot to keep 24/7)`);
});

// 🔄 Anti-AFK Engine
function startAntiAfk() {
    stopAntiAfk();
    botStatus.antiAfkActive = true;
    console.log("🛡️ Anti-AFK engine started.");

    // Perform an anti-AFK action every 15-25 seconds with random jitter
    const runCycle = () => {
        if (!bot || !bot.entity) return;

        try {
            // 1. Swing arm
            bot.swingArm("right");

            // 2. Sneak so bot never walks off blocks or edges
            bot.setControlState("sneak", true);

            // 3. Look around randomly
            const randomYaw = bot.entity.yaw + (Math.random() - 0.5) * 1.5;
            const randomPitch = (Math.random() - 0.5) * 0.6;
            bot.look(randomYaw, randomPitch, true);

            // 4. Random jump or safe micro-step
            const actionChoice = Math.random();
            if (actionChoice < 0.4) {
                // Short jump
                bot.setControlState("jump", true);
                setTimeout(() => {
                    if (bot) bot.setControlState("jump", false);
                }, 350);
            } else if (actionChoice < 0.8) {
                // Short safe forward step
                bot.setControlState("forward", true);
                setTimeout(() => {
                    if (bot) {
                        bot.setControlState("forward", false);
                        // Step back to original spot
                        bot.setControlState("back", true);
                        setTimeout(() => {
                            if (bot) bot.setControlState("back", false);
                        }, 200);
                    }
                }, 250);
            }

            botStatus.lastAction = new Date().toISOString();
            console.log(`[Anti-AFK] Action performed at ${botStatus.lastAction}`);
        } catch (err) {
            console.log("⚠️ Anti-AFK action error:", err.message);
        }

        // Schedule next cycle with randomized delay (15 to 25 seconds)
        const nextDelay = Math.floor(Math.random() * 10000) + 15000;
        antiAfkInterval = setTimeout(runCycle, nextDelay);
    };

    runCycle();
}

function stopAntiAfk() {
    botStatus.antiAfkActive = false;
    if (antiAfkInterval) {
        clearTimeout(antiAfkInterval);
        antiAfkInterval = null;
    }
    if (bot) {
        try {
            bot.clearControlStates();
        } catch (_) {}
    }
}

// 🤖 Mineflayer Bot Lifecycle
function startBot() {
    if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
    }

    console.log("");
    console.log("================================");
    console.log("🚀 Starting Mineflayer Anti-AFK Bot...");
    console.log(`🌐 Target Minecraft: ${HOST}:${PORT}`);
    console.log(`🤖 Bot Name: ${BOT_USERNAME}`);
    console.log("================================");

    bot = mineflayer.createBot({
        host: HOST,
        port: PORT,
        username: BOT_USERNAME,
        auth: "offline",
        version: false, // auto-detect version
        connectTimeout: 30000
    });

    bot.once("spawn", () => {
        botStatus.connected = true;
        botStatus.lastSpawn = new Date().toISOString();

        console.log("================================");
        console.log("✅ BOT JOINED MINECRAFT!");
        console.log(`🤖 ${bot.username} is now online & anti-AFK enabled!`);
        console.log("================================");

        // Start Anti-AFK movement
        startAntiAfk();

        // Greeting message
        setTimeout(() => {
            if (bot && bot.entity) {
                try {
                    bot.chat("Hello! I am online and keeping this server active 🤖");
                } catch (_) {}
            }
        }, 3000);
    });

    // Auto respawn if killed by mob or player
    bot.on("death", () => {
        console.log("💀 Bot died! Auto-respawning in 2 seconds...");
        setTimeout(() => {
            if (bot) {
                bot.respawn();
            }
        }, 2000);
    });

    // Respond to chat ping
    bot.on("chat", (username, message) => {
        if (username === bot.username) return;
        if (message.toLowerCase().trim() === "!ping") {
            bot.chat(`Pong, ${username}! 🏓 I am online and running 24/7.`);
        }
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
        botStatus.connected = false;
        stopAntiAfk();

        if (!reconnectTimer) {
            console.log("🔄 Reconnecting in 15 seconds...");
            reconnectTimer = setTimeout(() => {
                reconnectTimer = null;
                startBot();
            }, 15000);
        }
    });
}

// 🛡️ Crash Protection
process.on("uncaughtException", (err) => {
    console.log("💥 Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
    console.log("💥 Unhandled Rejection:", err);
});

startBot();

