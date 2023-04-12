const fs = require('node:fs')
const { Sequelize } = require('sequelize')
const { Client, Collection, GatewayIntentBits } = require('discord.js')
const { token } = require('./config.json')


const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers
	]
})

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
})

const AutoRole = sequelize.define('autorole', {
	role_id: {
		type: Sequelize.INTEGER,
		unique: true,
		primaryKey: true
	},
	guild_id: {
		type: Sequelize.INTEGER
	}
})

client.commands = new Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.ts'))
for (const file of commandFiles) {
	const command = require(`./commands/${file}`)
	client.commands.set(command.data.name, command)
}

client.once('ready', () => {
	AutoRole.sync();
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
		await command.execute(interaction, AutoRole)
	} catch (error) {
		console.error(error)
		await interaction.reply({
			content: "Il y a eu une erreur durant l'exécution de cette commande",
			ephemeral: true
		})
	}
})

client.on('guildMemberAdd', async member => {
	for (const value of member.guild.roles.cache) {
		const entry = await AutoRole.findOne({ where: { role_id: value[0], guild_id : member.guild.id }})
		if (entry && entry.dataValues.guild_id == member.guild.id) {
			let role = member.guild.roles.cache.find(role => role.id == entry.dataValues.role_id)
			await member.roles.add(role)
		}
	}
})

client.login(token)