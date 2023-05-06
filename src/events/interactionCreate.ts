import {Events} from 'discord.js';
import {InteractionMenu} from "../core/InteractionMenu";
import {AutoroleMainMenu, AutoroleModifyMenu} from "../menus/autorole";

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

        else {
            switch (interaction.customId) {
                case InteractionMenu.AutoroleToggle:
                    interaction.guild.storage.data.autorole.state = (!interaction.guild.storage.data.autorole.state)
                    interaction.guild.storage.save()

                    await interaction.update(AutoroleMainMenu(interaction))
                    break

                case InteractionMenu.AutoroleModify:
                    await interaction.update(AutoroleModifyMenu(interaction))
                    break

                case InteractionMenu.AutoroleChoose:
                    interaction.guild.storage.data.autorole.roles = interaction.values
                    interaction.guild.storage.save()

                    await interaction.update(AutoroleMainMenu(interaction))
                    break

                case InteractionMenu.AutoroleBlank:
                    interaction.guild.storage.data.autorole.roles = []
                    interaction.guild.storage.save()

                    await interaction.update(AutoroleMainMenu(interaction))
                    break

                case InteractionMenu.AutoroleCancel:
                    await interaction.update(AutoroleMainMenu(interaction))
            }
        }
    }
}