const Eris = require('eris')
const config = require('./config.json')
const client = new Eris(config.token, {maxShards: "auto", getAllUsers:true, intents:["guildPresences", "guildMembers", "guilds", "guildMessages"]}) // You can change your token using config.json
const fs = require('fs')

// Command Handler
client.commands = new Eris.Collection() // Making a new collection for commands
fs.readdir('./commands/', (err, files) => {
	if (err) console.error(err)
	files.forEach(file => {
		let f = require(`./commands/${file}`)
		client.commands.set(f.info.name, f) // Setting commands and names in collection
	})
})

let prefix = config.prefix // You can change your prefix using config.json (default is "!")
client.on('messageCreate', async message => {
	if (message.author.bot || !message.channel.guild || !message.content.startsWith(prefix)) return // Rejects if message author is a bot, message was not sent in a guild channel, message not starts with prefix

	let args = message.content.slice(prefix.length).trim().split(/ +/g) // Getting the args from message
	let command = args.shift().toLowerCase() // Getting the command from args
	let cmd;
	if (client.commands.has(command)) cmd = client.commands.get(command) // Checking if typed command is exists
	if (cmd) cmd.run(client, message, args) // Running the command if it is exists
})

client.on('ready', () => console.log('Bot is ready!')) // Ready Event
client.connect() // Connecting to the bot
