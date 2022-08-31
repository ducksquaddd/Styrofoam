const { ActivityType } = require("discord.js");

module.exports = {
    event_type: "ready",
    run_once: true,

    event_run: async (bot) => {
      console.log(`${bot.user.username} is ready.`);

      bot.user.setPresence(
        {
            status: "dnd",
            activities: [
                {
                    name: "Every new version of Discord.js is even more a pain in the ass than the last version.",
                    type: ActivityType.Custom
                }
            ]
        }
      )
    }
  }