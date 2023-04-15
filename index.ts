import * as fs from 'fs';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { token } from './config.json';

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers
	]
})

let serversAutoRole = {}

client.commands = new Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.ts'))
for (const file of commandFiles) {
	const command = require(`./commands/${file}`)
	client.commands.set(command.data.name, command)
}

client.once('ready', async () => {
	console.log('Prêt!')
})

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return
	const command = interaction.client.commands.get(interaction.commandName)
	if (!command) {
		console.error(`Aucune commande correspondant à ${interaction.commandName} n'a été trouvé`)
		return
	}

	try {
		await command.execute(interaction, serversAutoRole)
	} catch (error) {
		console.error(error)
		await interaction.reply({
			content: "Il y a eu une erreur durant l'exécution de cette commande",
			ephemeral: true
		})
	}
})

client.on('guildMemberAdd', async member => {
	for (const role of member.guild.roles.cache) {
		if (serversAutoRole[member.guild.id].includes(role[0])) {
			await member.roles.add(role)
		}
	}
})

client.login(token)