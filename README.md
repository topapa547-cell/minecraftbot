# 🎮 24/7 Minecraft Server & Anti-AFK Bot Setup

This guide provides everything you need to run your free Minecraft server and keep it active 24/7 with low ping in India and support for both Java and Bedrock players.

---

## 🤖 1. Deploying the Anti-AFK Bot (Free on Render)

Your updated [`index.js`](./index.js) has:
- **Anti-AFK Movements**: Sneaking, looking around randomly, swinging arm, jumping, and safe steps.
- **Auto-Respawn**: Respawns automatically in 2 seconds if killed.
- **Health/Uptime API**: Web endpoint on port `10000` (or `process.env.PORT`) for status monitoring.

### Steps to Deploy on Render.com (100% Free):
1. Push your updated code to GitHub:
   ```bash
   git add index.js
   git commit -m "feat: add anti-AFK movements and health endpoint"
   git push origin main
   ```
2. Go to **[Render.com](https://render.com/)** and log in (free account).
3. Click **New +** -> **Web Service**.
4. Connect your GitHub repository: `topapa547-cell/minecraftbot`.
5. Configure settings:
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Instance Type**: Free
6. In **Environment Variables**, add:
   - `MC_HOST`: `Suryansh123451.aternos.me` (or your server domain)
   - `MC_PORT`: `16356` (or your current server port)
   - `BOT_USERNAME`: `RenderBot`

### Keep Render Awake 24/7:
Render puts free web services to sleep after 15 minutes of inactivity. To prevent this:
1. Go to **[UptimeRobot.com](https://uptimerobot.com/)** (Free).
2. Click **Add New Monitor**:
   - **Monitor Type**: HTTP(s)
   - **Friendly Name**: Minecraft Bot
   - **URL**: Your Render service URL (e.g., `https://your-bot-name.onrender.com/`)
   - **Monitoring Interval**: 5 minutes
3. UptimeRobot will ping the bot every 5 minutes, keeping it online 24/7!

---

## 📱 2. Enabling Bedrock (Mobile/Console) on Aternos

If you are using Aternos:
1. Open the [Aternos Dashboard](https://aternos.org/servers/).
2. Go to **Software** -> Click **Paper / Purpur** (Select your Minecraft version).
3. Go to the **Plugins** tab:
   - Search for **GeyserMC (Geyser-Spigot)** and click Install.
   - Search for **Floodgate** and click Install.
4. Go back to the **Server** tab and start the server.
5. Click **Connect**:
   - **Java Players**: Join using `Suryansh123451.aternos.me:16356`
   - **Bedrock Players**: Use the Bedrock IP and Port shown in the Connect popup!

---

## ⚡ 3. Setting Up a Low-Ping Local Server in India with Playit.gg (Crossplay)

If you want the lowest possible ping (10-30ms) across India:

### Requirements:
- Java is already installed on your PC (`OpenJDK 25`).

### Step A: Download PaperMC
1. Download the latest Paper server `.jar` file from [papermc.io/downloads](https://papermc.io/downloads).
2. Place it in a folder (e.g., `C:\MinecraftServer` or inside this project folder).
3. Run it once using PowerShell:
   ```powershell
   java -Xmx4G -Xms2G -jar paper.jar nogui
   ```
4. Open `eula.txt` and change `eula=false` to `eula=true`.

### Step B: Add Bedrock Crossplay
1. Download [Geyser-Spigot.jar](https://geysermc.org/download#geyser) and [Floodgate-Spigot.jar](https://geysermc.org/download#floodgate).
2. Put both `.jar` files inside your server's `plugins/` directory.
3. Restart your server. Both Java and Bedrock ports are now active.

### Step C: Create Free Public Tunnel with Playit.gg
1. Download **[playit.gg](https://playit.gg/download/)** for Windows.
2. Run `playit.exe`. It will open a claim link in your browser.
3. In the Playit dashboard:
   - Add Tunnel -> **Minecraft Java** (Port: `25565`)
   - Add Tunnel -> **Minecraft Bedrock** (Port: `19132`)
4. Playit provides a free permanent address (e.g. `something.joinmc.link`) that anyone anywhere in the world can use to connect to your PC without opening router ports!
