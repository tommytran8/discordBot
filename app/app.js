const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();


/**
 * All commands are in file form
 * Useful since creating other commands is as easy as creating a new file in the commands folder. 
 * The event handler will automatically retrieve and register it whenever you restart your bot.
 */

const commandFolders = fs.readdirSync('./commands'); // reads all folder in commands folder
for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js')); // reads all command file names into array
  console.log(commandFiles);
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`); // gets all command objects from file
    client.commands.set(command.name, command); // sets each object to a key in Collection
  }
}

/**
 * All events are in file form
 * Useful since listening for other events is as easy as creating a new file in the events folder. 
 * The event handler will automatically retrieve and register it whenever you restart your bot.
 */

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js')); // reads all files in events folder
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client, prefix, Discord)); // register event using 'once' method
	} else {
		client.on(event.name, (...args) => event.execute(...args, client, prefix, Discord)); // register event using 'on' method
	}
}

client.login(token);
