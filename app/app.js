
const dotenv = require('dotenv');
dotenv.config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});


// console.log(process.env.A);
// console.log(process.env.B);
// console.log(process.env.TOKEN);

client.login(process.env.TOKEN);