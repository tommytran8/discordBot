const Discord = require('discord.js');
module.exports = {
	name: 'hi',
	description: "Greetings from MeguminBot",
	args: false,
	aliases: ['hello', 'hey', 'greeting'],
	cooldown: 5,
	execute(msg) {
		const embed = new Discord.MessageEmbed()
		.setDescription(`Greetings, ${msg.author.username}! My name is Megumin, wielder of the most glorious, powerful, and grand explosion magic.`)
		.attachFiles([`./assets/megumin-greeting.gif`])
		.setImage(`attachment://megumin-greeting.gif`);
		msg.channel.send(embed);
	},
};