const Discord = require('discord.js');
const bot = new Discord.Client({ intents: 32767 });

require('dotenv').config();

bot.login(process.env.TOKEN);