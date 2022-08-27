const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder().setName("hello").setDescription("Responds back with a 'Hi!'.")
function execute(i) {
  i.reply({ content: "Hi!", ephemeral: true });
}

module.exports = {data, execute};