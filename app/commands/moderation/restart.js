module.exports = {
	name: 'restart',
    description: 'Restart meguminBot',
    guildOnly: true,
    permissions: 'ADMINISTRATOR',
	execute(msg) {
        try {
            msg.channel.bulkDelete(1, true);
            process.exit();
        } catch (error) {
            console.error(error);
            msg.channel.send(`There was an error while reloading meguminBot:\n\`${error.msg}\``);
        }
	},
};