const Discord = require('discord.js');
const bot = new Discord.Client({ intents: 32767 });

require('dotenv').config();
bot.commands = new Discord.Collection;
bot.developers = require('./config.json').developers;
bot.maintenance = require('./config.json').maintenance;
bot.categories = require('./config.json').categories;

require('./handlers/command')(bot);
require('./handlers/events')(bot);

bot.login(process.env.TOKEN);