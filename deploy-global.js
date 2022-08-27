const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { clientID, categories } = require('./config.json');
const fs = require('fs');

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

let a = new Promise((res, rej) => {
    fs.readdir(`./commands/${categories[0]}/`, (err, files) => {
        if (err) throw err;

        let js = files.filter(x => x.endsWith('.js'));

        let commands = [];
        js.forEach(function (x) {
            const L = require(`./commands/${categories[0]}/${x}`);
            commands.push(L.data.toJSON());
        });
        res(commands);
    })
})
let b = new Promise((res, rej) => {
    fs.readdir(`./commands/${categories[1]}/`, (err, files) => {
        if (err) throw err;

        let js = files.filter(x => x.endsWith('.js'));

        let commands = [];
        js.forEach(function (x) {
            const L = require(`./commands/${categories[1]}/${x}`);
            commands.push(L.data.toJSON());
        });
        res(commands);
    })
})


Promise.all([a, b]).then((a) => {
    let r = [];
    a.forEach((b) => {
        b.forEach((c) => {
            r.push(c);
        })
    })
    rest.put(Routes.applicationCommands(clientID), { body: r })
        .then(() => {
            console.log("Success.")
        }).catch((err) => {
            console.log(err)
        });
})