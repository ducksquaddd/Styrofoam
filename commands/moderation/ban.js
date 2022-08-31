const { PermissionsBitField, SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans a person on your Discord server.")
    .addMentionableOption(option =>
        option.setName('target').setDescription('Select a user.').setRequired(true)
    )
    .addStringOption(option =>
        option.setName('reason').setDescription('Reason as to why you want to ban this user.').setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ModerateMembers);

function execute(i) {
    const member = i.options.getMentionable('target');
    const reason = i.options.getString('reason');
    
    if(member.manageable) {
        if(member.moderatable) {
            try {
                member.ban(reason).then((x) => {
                    i.reply(`Banned ${x.user.username}. Reason: ${reason}`)
                });
            } catch (err) {
                console.log(err);
            }
        } else {
            i.reply({ content: "This user is not moderatable. Please make sure I can kick/ban/timeout/etc this user.", ephemeral: true });
        }
    } else {
        i.reply({ content: "This user is above my role in the server hierarchy. I cannot do anything to this user.", ephemeral: true })
    };
}

module.exports = { data, execute };