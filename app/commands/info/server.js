module.exports = {
	name: 'server',
	description: "Server info",
	args: false,
	guildOnly: true,
	aliases: ['server-info'],
	execute(msg) {
		msg.channel.send(`This server's name is: ${msg.guild.name}\nTotal members: ${msg.guild.memberCount}`);
	},
};