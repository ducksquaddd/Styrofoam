const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js');
const Luxon = require('luxon');

const data = new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Mutes a person on your Discord server.")
    .addMentionableOption(option =>
        option.setName('target').setDescription('Select a user.').setRequired(true)
    )
    .addStringOption(option =>
        option.setName('time').setDescription('Time to mute this user for in seconds.').setRequired(true)
    )
    .addStringOption(option =>
        option.setName('reason').setDescription('Reason as to why you want to mute this user.').setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ModerateMembers);

function execute(i) {
    const member = i.options.getMentionable('target');
    const time = i.options.getString('time');
    const reason = i.options.getString('reason');

    const ex = /^\d*[smhdw]/g;

    let a;

    if(ex.test(time)) {
        let arr = ex.exec(time);
        a = arr[0];
    } else {
        return i.reply({ content: `don't try to break my bot bruh`, ephemeral: true })
    }

    const ending = a.slice(a.length-1);
    const t = a.slice(0, a.length-1);

    let z;
    let k;


    if(ending === 's') {
        z = Number(t) * 1000;
        k = "seconds";
    } else if(ending === 'm') {
        z = Number(t) * 60 * 1000;
        k = "minutes";
    } else if (ending === 'h') {
        z = Number(t) * 60 * 60 * 1000;
        k = "hours";
    } else if (ending === 'd') {
        z = Number(t) * 60 * 60 * 24 * 1000;
        k = "days";
    } else if (ending === 'w') {
        z = Number(t) * 60 * 60 * 24 * 7 * 1000;
        k = "weeks"
    } else {
        return i.reply({ content: `oi dumbass wsg bruh`, ephemeral: true })
    };

    try {
        member.timeout(z, reason).then((x) => {
            i.reply(`Muted ${x.user.username} for ${t} ${k}. Reason: ${reason}`)
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = { data, execute };