const fs = require('fs');
const Discord = require('discord.js');
const explosionQuotes = ["Darkness blacker than black and darker than dark, I beseech thee, combine with my deep crimson. The time of awakening cometh. Justice, fallen upon the infallible boundary, appear now as an intangible distortion! Dance, Dance, Dance! I desire for my torrent of power a destructive force: a destructive force without equal! Return all creation to cinders, and come from the abyss!",
"Oh, blackness shrouded in light Frenzied blaze clad in night In the name of the crimson demons, let the collapse of thine origin manifest. Summon before me the root of thy power hidden within the lands of the kingdom of demise!",
"Crimson-black blaze, king of myriad worlds, though I promulgate the laws of nature, I am the alias of destruction incarnate in accordance with the principles of creation. Let the hammer of eternity descend unto me! ... Burn to ashes within the crimson.",
"Detonation... Detonation... Detonation... Wielder of the most glorious, powerful, and grand explosion magic, My name is Megumin. The blow that I am given to strike turns a blind eye to the fate of my kindred, rendering all hope of rebirth and anguish, and the model by which all forces are judged! Pitiful creature... Synchronize yourself with the red smoke, and atone in a surge of blood!",
"The tower of rebellion creeps upon man's world, The unspoken faith displayed before me, The time has come! Now, awaken from your slumber, and by my madness, be wrought!"
]
module.exports = {
	name: 'explosion',
    args: false,
	cooldown: 30,
	execute(msg) { //will have random array of quotes and gifs
		const explosionFiles = fs.readdirSync('./assets/explosionGIFs');
		const rand = Math.floor(explosionFiles.length*(Math.random()*100)/100);
		const randQuote =  Math.floor(5*(Math.random()*100)/100);
		const embed = new Discord.MessageEmbed()
		.setDescription(`${explosionQuotes[randQuote]}\nEx-PLOSION~!`)
		.attachFiles([`./assets/explosionGIFs/${explosionFiles[rand]}`])
		.setImage(`attachment://${explosionFiles[rand]}`);
		msg.channel.send(embed);
	},
};