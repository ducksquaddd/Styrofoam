const fs = require('node:fs');
const path = require('node:path');

module.exports = async (bot) => {
    fs.readdir(path.resolve('./events/'), (err, files) => {
        let jsFiles = files.filter(f => f.split('.').pop() === 'js');

        jsFiles.forEach((event) => {
            const eventFile = require(path.resolve(`./events/${event}`));

            const { event_type, run_once, event_run } = eventFile

            try {
                bot[run_once ? 'once' : 'on'](event_type, async (...args) => {
                    event_run(...args, bot);
                })
            }
            catch (err) {
                console.log(err)
            }
        })
    })
}