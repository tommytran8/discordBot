module.exports = {
	name: 'message',
	execute(msg, client, prefix, Discord) {
		if (!msg.content.startsWith(prefix) || msg.author.bot) return; //if user message is not a command or if message is from bot, do nothing

        const args = msg.content.slice(prefix.length).trim().split(/ +/); //removes the prefix, gets all arguments separated by empty spacing, and remove white spaces
        const commandName = args.shift().toLowerCase(); // gets commandName from first element of args
        const command = client.commands.get(commandName)
                || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)); //gets command from Collection

        if (!command) return msg.channel.send("Baka! Command does not exist!"); // checks if command exist

        if (command.guildOnly && msg.channel.type === 'dm') { //used for commands that should only be used in servers
            return msg.reply('I can\'t execute that command inside DMs!');
        }

        if (command.permissions) { //prevents those without authority to use commands that are for moderators.
            const authorPerms = msg.channel.permissionsFor(msg.author);
            if (!authorPerms || !authorPerms.has(command.permissions)) {
                return msg.reply('You can not do this!');
            }
        }


        if (command.args && !args.length) { // if there should be arguments but no argument was passed, return message
            let reply = `You didn't provide any arguments, ${msg.author}!`;

            if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``; // tell user how to use command properly
            }
            return msg.channel.send(reply);
        }

        if (command.needTag){ //if arguments are passed but does not have a required tagged name
            if (!msg.mentions.users.size) {
            return msg.channel.send(`You need to tag a user in this command!`);
        }
        }

        const cooldowns = client.cooldowns; // contains all commands
        if (!cooldowns.has(command.name)) {  // check if the cooldowns Collection already has an entry for the command being used right now
            cooldowns.set(command.name, new Discord.Collection());
        }
        
        const now = Date.now();
        const timestamps = cooldowns.get(command.name); //reference to the Collection of user-ID and timestamp key/value pairs for the command
        const cooldownAmount = (command.cooldown || 3) * 1000; //defaults 3 seconds
        
        if (timestamps.has(msg.author.id)) {
            const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

            if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            if (!command.aliases) return msg.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
            else return msg.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}/${command.aliases.join('/')}\` command.`);
            }
        }
        timestamps.set(msg.author.id, now); //sets timestamps using time when called
        setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount); //after X seconds remove command from timestamps

        try {
            command.execute(msg, args);
        } catch (error) {
            console.error(error); // catches any error if there is one
            msg.reply('there was an error trying to execute that command!');
        }
	},
};