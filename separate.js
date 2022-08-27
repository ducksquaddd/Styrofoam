const fs = require('fs');

const { clientID, categories } = require('./config.json');
let a = [];
let g = new Promise((resolve, rej) => {
    fs.readdir(`./commands/${categories[0]}/`, (err, files) => {
        if(err) throw err;
    
        let js = files.filter(x => x.endsWith('.js'));
        let commands = [];
        js.forEach(function (x) {
            commands.push(x);
        })
        resolve(commands)
    })
})
let h = new Promise((resolve, rej) => {
    fs.readdir(`./commands/${categories[1]}/`, (err, files) => {
        if(err) throw err;
    
        let js = files.filter(x => x.endsWith('.js'));
        let commands = [];
        js.forEach(function (x) {
            commands.push(x);
        })
        resolve(commands)
    })
})

Promise.all([g,h]).then((x) => {
    let e = [];
    x.forEach(function (a) {
        a.forEach(function (b) {
            e.push(b);
        })
    });
    console.log(e);
})


// let a = ["a", "b", "c"];

// let b = [];

// a.forEach(function (x) {
//     b.push(x);
// });

// console.log(b);