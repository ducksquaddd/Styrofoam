module.exports = {
    evt: "interactionCreate",
    once: false,
    run: async (interaction, bot) => {
      if(!interaction.isCommand()) return;
  
      const command = bot.commands.get(interaction.commandName);
      if(!command) return;
  
      try {
        await command.execute(interaction);
      } catch (err) {
        console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }
    }
  }