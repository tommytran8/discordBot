const Discord = require('discord.js');
module.exports = {
	name: 'twitter',
    description: "MeguminBot links Konosuba Official English Twitter",
    args: false,
	cooldown: 30,
	execute(msg) {
		const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
		.setTitle(`Konosuba's Twitter`)
		.attachFiles([`./assets/twitter.png`])
		.setThumbnail(`attachment://twitter.png`)
		.setURL(`https://twitter.com/Konosuba_Anime?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor`);
		msg.channel.send(embed);
	},
};