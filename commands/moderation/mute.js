const { SlashCommandBuilder } = require('@discordjs/builders');
const Luxon = require('luxon');

const data = new SlashCommandBuilder()
.setName("mute")
.setDescription("Mutes a person on your Discord server.")
.addMentionableOption(option => {
    option.setName('target').setDescription('Select a user.').setRequired(true);
})
.addNumberOption(option => {
    option.setName('time').setDescription('Time to mute this user for in seconds.').setRequired(true);
})
.addStringOption(option => {
    option.setName('reason').setDescription('Reason as to why you want to mute this user.').setRequired(false);
})
.setDefaultMemberPermissions(["MuteMembers", "ModerateMembers"])

function execute(i) {
    const member = i.options.getMentionable('target');
    const time = i.options.getString('time');
    const reason = i.options.getString('reason');

    let seconds = time * 1000;

    try {
        member.timeout(seconds, reason);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {data, execute};