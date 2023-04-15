import * as fs from 'fs';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { token, clientId, guildId } from '../saves/config.json';

const commands = []
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.ts'))

for (const file of commandFiles) {
	const command = require(`./commands/${file}`)
	commands.push(command.data.toJSON())
}

const rest = new REST({ version: '9' }).setToken(token)

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log("Toutes les commandes de l'application ont été enregistrées avec succès"))
	.catch(console.error)