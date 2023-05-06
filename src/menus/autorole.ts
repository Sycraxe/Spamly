import {ActionRowBuilder, ButtonBuilder, ButtonStyle, RoleSelectMenuBuilder, EmbedBuilder} from "discord.js";
import {InteractionMenu} from "../core/InteractionMenu";

export function AutoroleMainMenu(interaction) {
    return {
        ephemeral: true,
        embeds: [
            new EmbedBuilder()
                .setTitle('Rôles automatiques')
                .setDescription('Bienvenue dans l\'utilitaire de gestion des rôles automatiques.\nQue souhaitez-vous faire ?')
                .setColor("#0144af")
                .setFooter({text: "Si vous souhaitez quitter l'utilitaire, pouvez cliquez sur \"Rejeter le message\"" })
                .setAuthor({name: interaction.client.user.username, iconURL: interaction.client.user.avatarURL()})
        ],
        components: [
            new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(InteractionMenu.AutoroleModify)
                        .setLabel('Gérer les rôles automatiques')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId(InteractionMenu.AutoroleToggle)
                        .setLabel((interaction.guild.storage.data.autorole.state ? 'Désa' : 'A') + 'ctiver la fonctionnalité')
                        .setStyle(ButtonStyle.Danger)
                )
        ]
    }
}

export function AutoroleModifyMenu(interaction) {
    return {
        ephemeral: true,
        embeds: [
            new EmbedBuilder()
                .setTitle('Rôles automatiques')
                .setDescription('Veuillez sélectionner les nouveaux rôles automatiques.\nVous ne pouvez en sélectionner que 25 maximum')
                .setColor("#0144af")
                .setFooter({text: "Si vous souhaitez quitter l'utilitaire, pouvez cliquez sur \"Rejeter le message\"" })
                .setAuthor({name: interaction.client.user.username, iconURL: interaction.client.user.avatarURL()})
        ],
        components: [
            new ActionRowBuilder()
                .addComponents(
                    new RoleSelectMenuBuilder()
                        .setCustomId(InteractionMenu.AutoroleChoose)
                        .setMinValues(0)
                        .setMaxValues(25)
                        .setPlaceholder('Choisis ici les nouveaux rôles automatiques')
                ),
            new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(InteractionMenu.AutoroleBlank)
                        .setLabel('Laisser la liste de rôles vide')
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId(InteractionMenu.AutoroleCancel)
                        .setLabel('Annuler les modifications')
                        .setStyle(ButtonStyle.Danger)
                )
        ]
    }
}