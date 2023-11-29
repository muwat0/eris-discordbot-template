const Eris = require('eris')
const config = require('./config.json')
const client = new Eris(config.token, {maxShards: "auto", getAllUsers:true, intents:["guildPresences", "guildMembers", "guilds", "guildMessages"]})
const fs = require('fs')

// Command Handler
client.commands = new Eris.Collection()
fs.readdir('./commands/', (err, files) => {
	if (err) console.error(err)
	files.forEach(file => {
		let f = require(`./commands/${file}`)
		client.commands.set(f.info.name, f)
	})
})

let prefix = config.prefix

client.on('messageCreate', async message => {
	if (message.author.bot || !message.channel.guild || !message.content.startsWith(prefix)) return

	let args = message.content.slice(prefix.length).trim().split(/ +/g)
	let command = args.shift().toLowerCase()
	let cmd;
	if (client.commands.has(command)) cmd = client.commands.get(command)
	if (cmd) cmd.run(client, message, args)

})



// Ready Event
client.on('ready', () => {
	console.log('Bot is ready!')
})



client.connect()