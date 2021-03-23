const Discord = require('discord.js');
module.exports = {
	name: 'no',
	description: "Rules of the server by MeguminBot",
	args: false,
	aliases: ['bad'],
	cooldown: 30,
	execute(msg) {
		const embed = new Discord.MessageEmbed()
		.setDescription(`\nNo`)
		.attachFiles([`./assets/megumin-No.gif`])
		.setImage(`attachment://megumin-No.gif`);
		msg.channel.send(embed);
	},
};