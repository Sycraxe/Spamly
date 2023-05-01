import { Events } from 'discord.js';

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`Aucune commande correspondant à ${interaction.commandName} n'a été trouvé`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error)
            await interaction.reply({
                content: "Il y a eu une erreur durant l'exécution de cette commande",
                ephemeral: true
            })
        }
    },
};