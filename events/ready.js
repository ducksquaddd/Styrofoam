module.exports = {
    event_type: "ready",
    run_once: true,

    event_run: async (bot) => {
      console.log(`${bot.user.username} is ready.`)
    }
  }