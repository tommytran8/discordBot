const Discord = require('discord.js');
module.exports = {
	name: 'website',
    description: "MeguminBot links Konosuba on Crunchyroll",
    aliases: ['konosuba'],
    args: false,
	cooldown: 30,
	execute(msg) {
		const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
		.setTitle(`Konosuba Website`)
		.attachFiles([`./assets/websiteImage.jpg`])
		.setImage(`attachment://websiteImage.jpg`)
		.setURL(`http://konosuba.com/`);
		msg.channel.send(embed);
	},
};