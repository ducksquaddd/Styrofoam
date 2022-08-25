const fs = require('node:fs');
const path = require('node:path');

module.exports = async (bot) => {
    fs.readdir(path.resolve('./events/'), (err, files) => {
        let jsFiles = files.filter(f => f.split('.').pop() === 'js');

        jsFiles.forEach((event) => {
            const eventFile = require(path.resolve(`./events/${event}`));

            const event_name = eventFile.evt;
            const event_run = eventFile.run;
            const event_once = eventFile.once;

            try {
                bot[event_once ? 'once' : 'on'](event_name, async (...args) => {
                    event_run(...args, bot);
                })
            }
            catch (err) {
                return message.reply(`FUCK: ${err.message}`)
            }
        })
    })
}