const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', async (message) => {
  let prefix = '!'
  if( message.content[0] === prefix){
      if (!message.guild) return
  
      if (message.content === `${prefix}ping`) message.channel.send('It\'s working!')
  
      if (message.content.startsWith(commands.CONNECT)) {
          if (message.member.voice.channel) {
              connection = await message.member.voice.channel.join()
          } else {
              message.reply('You need to join a voice channel first!')
          }
      }
  
      if (message.content.startsWith(commands.DISCONNECT)) {
          connection.disconnect()
      }
  }
})


const TOKEN = process.env.TOKEN
client.login(TOKEN)
