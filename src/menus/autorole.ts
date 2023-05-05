import {StandardEmbed} from "../core/StandardEmbed";
import {ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder} from "discord.js";
import {InteractionMenu} from "../core/InteractionMenu";

export function AutoroleMainMenu(interaction) {
    return {
        embeds: [
            new StandardEmbed()
                .setTitle('Rôles automatiques')
                .setDescription('Bienvenue dans l\'utilitaire de gestion des rôles automatiques.\nQue souhaitez-vous faire ?')
        ],
        components: [
            new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(InteractionMenu.AutoroleModify)
                        .setLabel('Modifier la liste des rôles automatiques')
                        .setStyle(ButtonStyle.Secondary)
                ),
            new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(InteractionMenu.AutoroleToggle)
                        .setLabel((interaction.guild.storage.data.autorole.state ? 'Désa' : 'A') + 'ctiver les rôles automatiques')
                        .setStyle(ButtonStyle.Secondary)
                ),
            new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(InteractionMenu.AutoroleClose)
                        .setLabel('Fermer le gestionnaire')
                        .setStyle(ButtonStyle.Danger)
                )
        ]
    }
}

export function AutoroleModifyMenu(interaction) {
    let options = []
    interaction.guild.roles.cache.forEach((role) => {
        options.push({
            default: interaction.guild.storage.data.autorole.roles.includes(role.id),
            label: role.name,
            value: role.id
        })
    })

    return {
        embeds: [
            new StandardEmbed()
                .setTitle('Rôles automatiques')
                .setDescription('Veuillez modifier la liste des rôles automatiques.')
        ],
        components: [
            new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId(InteractionMenu.AutoroleChoose)
                        .setMinValues(0)
                        .setMaxValues(options.length)
                        .addOptions(options)
                ),
            new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(InteractionMenu.AutorolePass)
                        .setLabel('Fermer la sélection')
                        .setStyle(ButtonStyle.Danger)
                )
        ]
    }
}