import * as fs from 'fs';
import { Collection, GatewayIntentBits } from 'discord.js';
import { token } from '../saves/config.json';
import {DatabaseClient, DatabaseManager} from "./class/DataClient";

function init(storage: DatabaseManager) {
	if (storage.data.autorole === undefined) storage.data.autorole = {}
	if (storage.data.autorole.roles === undefined) storage.data.autorole.roles = []
	if (storage.data.autorole.enabled === undefined) storage.data.autorole.enabled = true
}

const client = new DatabaseClient({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers
	]},
	"./saves", init)

client.commands = new Collection()
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.ts'))
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
		await command.execute(interaction)
	} catch (error) {
		console.error(error)
		await interaction.reply({
			content: "Il y a eu une erreur durant l'exécution de cette commande",
			ephemeral: true
		})
	}
})

client.on('guildMemberAdd', async member => {
	if (!member.guild.storage.data.autorole.enabled) return
	member.guild.storage.data.autorole.roles.forEach((id) => {
		let role = member.guild.roles.cache.get(id)
		if (!role) return
		member.roles.add(role)
	})
})

client.login(token)