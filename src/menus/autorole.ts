import {ActionRowBuilder, ButtonBuilder, ButtonStyle, RoleSelectMenuBuilder, EmbedBuilder} from "discord.js";
import {InteractionMenu} from "../const/InteractionMenu";

export function AutoroleMainMenu(interaction, call = '') {

    let description
    switch (call) {
        case InteractionMenu.AutoroleModified:
            description = "Les rôles ont été modifiés avec succès."
            description += "\nSouhaitez-vous faire autre chose ?"
            break
        case InteractionMenu.AutoroleWarning:
            description = "Les rôles ont été modifiés avec succès."
            description += "\n**ATTENTION:** Une partie des rôles sélectionnés ne pourrait pas être attribuée correctement en raison de leur rang trop élevé."
            description += "\nSouhaitez-vous faire autre chose ?"
            break
        case InteractionMenu.AutoroleEnabled :
            description = "Les rôles automatiques ont été activés avec succès."
            description += "\nSouhaitez-vous faire autre chose ?"
            break
        case InteractionMenu.AutoroleDisabled:
            description = "Les rôles automatiques ont été désactivés avec succès."
            description += "\nSouhaitez-vous faire autre chose ?"
            break
        case InteractionMenu.AutoroleCanceled:
            description = "L'opération a été interrompue avec succès."
            description += "\nSouhaitez-vous faire autre chose ?"
            break
        default:
            description = "Bienvenue dans l'utilitaire de gestion des rôles automatiques."
            description += "\nQue souhaitez-vous faire ?"
            break
    }

    return {
        ephemeral: true,
        embeds: [
            new EmbedBuilder()
                .setTitle('Rôles automatiques')
                .setDescription(description)
                .setColor("#0144af")
                .setFooter({text: "Si vous souhaitez quitter l'utilitaire, pouvez cliquez sur 'Rejeter le message'" })
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