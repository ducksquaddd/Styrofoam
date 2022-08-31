const { PermissionsBitField, SlashCommandBuilder } = require('discord.js');
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
        let arr = time.match(ex);
        a = arr[0];
    } else {
        return i.reply({ content: `Unfortunately, you didn't specify a correct time.`, ephemeral: true })
    }

    const ending = a.slice(a.length-1);
    const t = a.slice(0, a.length-1);

    let z;
    let k;

    switch (ending) {
        case 's':
            z = Number(t) * 1000;
            k = "seconds";
            break
        case 'm':
            z = Number(t) * 60 * 1000;
            k = "minutes";
            break
        case 'h':
            z = Number(t) * 60 * 60 * 1000;
            k = "hours";
            break
        case 'd':
            z = Number(t) * 60 * 60 * 24 * 1000;
            k = "days";
            break
        case 'w': 
            z = Number(t) * 60 * 60 * 24 * 7 * 1000;
            k = "weeks"
            break
        default:
            return i.reply({ content: `Unfortunately, an error has occurred, please try again.`, ephemeral: true })
    };

    if(member.manageable) {
        if(member.moderatable) {
            try {
                member.timeout(z, reason).then((x) => {
                    i.reply(`Muted ${x.user.username} for ${t} ${k}. Reason: ${reason}`)
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