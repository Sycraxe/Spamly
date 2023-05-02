import * as fs from 'fs';
import {Collection, GatewayIntentBits} from 'discord.js';
import {token} from '../saves/config.json';
import {DatabaseClient, DatabaseManager} from "./core/DatabaseClient";

function init(storage: DatabaseManager) {
	if (storage.data.autorole === undefined) storage.data.autorole = {}
	if (storage.data.autorole.roles === undefined) storage.data.autorole.roles = []
	if (storage.data.autorole.state === undefined) storage.data.autorole.state = true
	if (storage.data.interaction === undefined) storage.data.interaction = {}
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

const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.ts'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(token)