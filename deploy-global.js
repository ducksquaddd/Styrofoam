const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { clientID, categories } = require('./config.json');

const fs = require('node:fs');
const path = require('node:path');

let commands = [];
let pro = new Promise((res, rej) => {
    categories.forEach((ctg) => {
        fs.readdir(path.resolve(`./commands/${ctg}/`), (err, files) => {
            if(err) throw err;
            let f = files.filter(x => x.endsWith('.js'));
            f.forEach(file => {
                commands.push(file);
                res(commands);
            })
        })
    })
})


pro.then((x) => {

    console.log(x);
    
    const rest = new REST({ version: '10' }).setToken(process.env['TOKEN']);

    rest.put(Routes.applicationCommands(clientID), { body: x })
	.then(() => console.log('Successfully registered application commands globally.'))
	.catch(console.error);
});