const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js');
const Luxon = require('luxon');

const data = new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("Unmutes a person from your Discord server.")
    .addMentionableOption(option =>
        option.setName('target').setDescription('Select a user.').setRequired(true)
    )
    .addStringOption(option =>
        option.setName('reason').setDescription('Reason as to why you want to mute this user.').setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ModerateMembers);

function execute(i) {
    const member = i.options.getMentionable('target');
    const reason = i.options.getString('reason');
    try {
        member.timeout(null, reason).then((x) => {
            i.reply(`Unmuted ${x.user.username}. Reason: ${reason}`)
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = { data, execute };