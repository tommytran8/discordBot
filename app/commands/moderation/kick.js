module.exports = {
	name: 'kick',
    args: true,
    usage: '[@username]', //tells user how to properly use command
    guildOnly: true,
    needTag: true,
    aliases: ['remove'],
    permissions: 'KICK_MEMBERS',
	execute(msg) {
        try {
            const member = msg.mentions.members.first();
            member.kick()
            .then(response => {
                console.log(response);
                msg.channel.send(`You kicked: ${member.user.username}`);
            })
            .catch(error => {
                console.log(error);
                msg.channel.send(`You are not allowed to kick:\n\`${ member.user.username}\``);
            });           
        } catch (error){
            console.error(error);
            msg.channel.send(`You are not allowed to kick:\n\`${ msg.mentions.members.first().user.username}\``);
        }
	},
};