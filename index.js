let commands = require('./Constants').commands
require('dotenv').config()
const { Client, Collection } = require('discord.js')
const client = new Client()
client.commands = new Collection()

let fs = require('fs')
fs.readdir('./commands/', (err, files) => {
    if (err) {
        console.error(err)
    }
    let jsfiles = files.filter((f) => f.split('.').pop() === 'js')
    if (jsfiles.length <= 0) {
        console.error('No commands found.')
    }
    jsfiles.forEach((file) => {
        let props = require(`./commands/${file}`)
        // console.log(`${file} loaded`)
        client.commands.set(props.name, props)
    })
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', async (message) => {
  let prefix = '!'
  if( message.content[0] === prefix){
    let messageArray = message.content.split(' ')
    let cmd = messageArray[0]
    let args = messageArray.slice(1)

    let commandFile = client.commands.get(cmd.slice(prefix.length))
    console.log(client.commands)

    if (commandFile) {
        if (commandFile.name === commands.YOUTUBE && connection != null) {
            commandFile.run(connection, args)
        } else if (commandFile.name === commands.POLL || commandFile.name === commands.LIST || commandFile.name === commands.SEARCH ) {
            commandFile.run(message)
        } else {
            if (connection === null) {
                message.reply(
                    'You must connect the bot with the `!connect` command!'
                )
            } else {
                commandFile.run(connection, message)
            }
        }
    }


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
