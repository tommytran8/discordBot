const fs = require('fs');
function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb(err)
        }
        try {
            const object = JSON.parse(fileData)
            return cb && cb(null, object)
        } catch(err) {
            return cb && cb(err)
        }
    });
}

module.exports = {
	name: 'unban',
    args: true,
    usage: '[username#1234]', 
    guildOnly: true,
    permissions: 'BAN_MEMBERS',
	execute(msg, args) {
        if (msg.mentions.users.size) {return msg.channel.send("Cannot unban a person with a tag")}
        jsonReader('./banned.json', (err, data) => {
            if (err) console.log(err);
            else {
                const banned = data;
                const id = banned[args[0]];
                if (!id) return msg.channel.send("That person is not banned and/or Enter a valid username");
                delete banned[args[0]];
                fs.writeFile('./banned.json', JSON.stringify(banned), (err) => {
                    if (err) console.log('Error writing file:', err);
                });
                
                msg.guild.members.unban(id)
                .then(response => {
                    console.log(response);
                    msg.channel.send(`You unbanned ${args[0]}`);
                })
                .catch(error => {
                    console.log(error);
                    msg.channel.send("The person is not banned and/or Enter a valid username");
                });
            }
        });
	},
};