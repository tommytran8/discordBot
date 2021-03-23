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
	name: 'ban',
    args: true,
    usage: '[@username]', 
    guildOnly: true,
    needTag: true,
    permissions: 'BAN_MEMBERS',
	execute(msg) {
        const user = msg.mentions.users.first();

        jsonReader('./banned.json', (err, data) => {
            if (err) console.log(err);
            else {
                msg.guild.members.ban(user)
                .then(response => {
                    console.log(response);
                    msg.channel.send(`You banned ${user.username}`);
                    const banned = data;
                    banned[`${user.username}#${user.discriminator}`] = user.id;
                    fs.writeFile('./banned.json', JSON.stringify(banned), (err) => {
                        if (err) console.log('Error writing file:', err);
                    });
                })
                .catch(error => {
                    console.log(error);
                    msg.channel.send("You cannot ban this person");
                });
            }
        });
	},
};