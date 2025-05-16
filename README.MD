## ⚡ Quick Start

1. Clone this repository:
    ```sh
    git clone https://github.com/turkerssh/discord.js-server-kick-bot.git
    ```
2. Install the required packages:
    ```sh
    npm install
    ```
3. Copy `config.example.js` to `config.js` and update it with your settings.
4. Launch the bot:
    ```sh
    npm run start
    ```

## ℹ️ About

This project provides a simple Discord bot to help manage membership across two servers. If a user leaves the main server, the bot will automatically kick that user from the second server as well. Similarly, if a user joins the second server but is not a member of the main server, the bot will remove them from the second server. This ensures membership synchronization between the two servers, so only members of the main server can stay in the second server.

The bot is built with Discord.js v14 and focuses on membership checks and automatic kicking between two servers. The project offers a clean and straightforward structure to help you quickly create your own server management bot.

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.