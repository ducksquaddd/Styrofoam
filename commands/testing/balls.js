const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder().setName("hello").setDescription("Responds back with a 'Hi!'.")
function execute(i) {
  i.reply({ content: "Hi!" });
}

module.exports = {data, execute};