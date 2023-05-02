import {Events} from 'discord.js';

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isChatInputCommand()) {
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
        }

        if (interaction.isButton()) {
            //
            // const collectorFilter = i => i.user.id === interaction.user.id;
            //
            // try {
            //     const confirmation = await response.awaitMessageComponent({filter: collectorFilter});
            //
            //     if (confirmation.customId === 'add') {
            //         await interaction.editReply({
            //             embeds: [
            //                 new StandardEmbed()
            //                     .setTitle('Autorole')
            //                     .setDescription('Tu veux en ajouter un, d\'accord mais lequel ?')
            //             ],
            //             components: []
            //         });
            //     }
            //     else if (confirmation.customId ==='remove') {
            //         await interaction.editReply({
            //             embeds: [
            //                 new StandardEmbed()
            //                     .setTitle('Autorole')
            //                     .setDescription('Tu veux en enlever un, d\'accord mais lequel ?')
            //             ],
            //             components: []
            //         });
            //     }
            //
            //
            // } catch (e) {
            //     await interaction.editReply({
            //         embeds: [
            //             new StandardEmbed()
            //                 .setTitle('Autorole')
            //                 .setDescription('Nope')
            //         ],
            //         components: []
            //     });
            // }
        }

    },
};