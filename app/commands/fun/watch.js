const Discord = require('discord.js');
module.exports = {
	name: 'watch',
    description: "MeguminBot links Konosuba on Crunchyroll",
    aliases: ['watchkonosuba', 'crunchyroll'],
    args: false,
	cooldown: 30,
	execute(msg) {
		const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
		.setTitle(`Konosuba on Crunchyroll`)
		.attachFiles([`./assets/crunchyroll.png`])
		.setThumbnail(`attachment://crunchyroll.png`)
		.setURL(`https://www.crunchyroll.com/konosuba-gods-blessing-on-this-wonderful-world`);
		msg.channel.send(embed);
	},
};