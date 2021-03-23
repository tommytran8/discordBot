const Discord = require('discord.js');
module.exports = {
	name: 'subreddit',
    description: "MeguminBot links the subreddit",
    aliases: ['reddit'],
    args: false,
	cooldown: 30,
	execute(msg) {
		const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
		.setTitle(`Konosuba Subreddit`)
		.attachFiles([`./assets/reddit.jpg`])
		.setThumbnail(`attachment://reddit.jpg`)
		.setURL(`https://www.reddit.com/r/Konosuba/`);
		msg.channel.send(embed);
	},
};