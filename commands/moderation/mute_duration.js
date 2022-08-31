const { PermissionsBitField, SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
    .setName("mute-duration")
    .setDescription("Sends the duration of how long the targeted user is muted for.")
    .addMentionableOption(option =>
        option
        .setName('target')
        .setDescription('Select a user.')
        .setRequired(true)
    )
    .addStringOption(option => 
        option
        .setName('hidden')
        .setChoices([
            { name: "yes", value: true },
            { name: "no", value: false }
        ])
    )
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ModerateMembers);

function execute(i) {
    const member = i.options.getMentionable('target');
    const hidden = i.options.getString('hidden');

    try {
        if(member.isCommunicationDisabled()) {
            i.reply({ content: `${member.tag} is muted until ${member.communicationDisabledUntil}.`, ephemeral: hidden });
        } else {
            i.reply({ content: `${member.tag} is not currently muted.`, ephemeral: hidden })
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = { data, execute };