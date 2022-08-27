const fs = require('fs');
const path = require('path');

module.exports = async (bot) => {
    bot.categories.forEach(category => {
        fs.readdir(path.resolve(`./commands/${category}/`), (err, files) => {
            let a = files.filter(x => x.endsWith(".js"));
            a.forEach(cmdfile => {
                const cmd = require(`../commands/${category}/${cmdfile}`);
                bot.commands.set(cmd.data.name, cmd);
            });
        })
    });
}