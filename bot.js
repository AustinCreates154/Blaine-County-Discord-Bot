const Discord = require('discord.js');
var bot = new Discord.Client();
const fs = require('fs');
const config = require(`./config.json`);
var prefix = config.prefix

bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  console.log('Loading my commands!');
  if (err) return console.log("Error loading commands.");
  files.filter(f => f.split(".").pop() === "js").forEach(f, i) => {
    bot.commands.set(require(`./commands/${f}`).help.name, require(`./commands/${f}`));  
  });
});

bot.on("ready" () => {
  console.log(`${bot.user.tag}, is ready!`);
  bot.user.setActivity('Hello!')
  });
  
bot.on('message', message => {
  let mArray = message.content.split(" ")
  let args = mArray.slice(1)
  let cmd = bot.commands.get(mArray[0].slice(prefix.length))
  if (message.author.bot) return;
  if (message.channel.type == "dm") return;
  if (!message.content.startsWith(prefix)) return;
  
  if (cmd) {
    cmd.run(bot, message, args, discord)
    console.log(`${message.author.username} used the ${message.content.split(" ")[0]} command.`)
    }
})
