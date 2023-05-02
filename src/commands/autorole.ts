import {SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder} from 'discord.js';
import {StandardEmbed} from '../core/StandardEmbed';
import {InteractionMenu} from "../core/InteractionMenu";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('autorole')
        .setDescription("Attribut automatiquement des rôles aux nouveaux arrivants")
    // .addSubcommand(subcommand =>
    //     subcommand
    //         .setName('add')
    //         .setDescription("Ajoute un rôle à la liste des rôles automatiques")
    //         .addRoleOption(option =>
    //             option
    //                 .setName('role')
    //                 .setDescription('Le rôle à ajouter')
    //                 .setRequired(true)))
    // .addSubcommand(subcommand =>
    //     subcommand
    //         .setName('remove')
    //         .setDescription("Retire un rôle de la liste des rôles automatiques")
    //         .addRoleOption(option =>
    //             option
    //                 .setName('role')
    //                 .setDescription('Le rôle à retirer')
    //                 .setRequired(true)))
    ,

    async execute(interaction) {
        // const role = interaction.options.getRole('role')
        //
        // let message = ""
        //
        // if (interaction.options.getSubcommand() === 'add') {
        //     if (!interaction.guild.storage.data.autorole.roles.includes(role.id)) {
        //         interaction.guild.storage.data.autorole.roles.push(role.id)
        //         message = `**Le rôle <@&${role.id}> a été ajouté à la liste des rôles automatiques avec succès.**`
        //     } else {
        //         message = `**Le rôle <@&${role.id}> est déjà présent dans la liste des rôles automatiques.**`
        //     }
        // }
        //
        // else if (interaction.options.getSubcommand() === 'remove') {
        //     if (interaction.guild.storage.data.autorole.roles.includes(role.id)) {
        //         let index = interaction.guild.storage.data.autorole.roles.indexOf(role.id)
        //         interaction.guild.storage.data.autorole.roles.splice(index)
        //         message = `**Le rôle <@&${role.id}> a bien été retiré de la liste des rôles automatiques.**`
        //     } else {
        //         message = `**Le rôle <@&${role.id}> n'est pas présent dans la liste des rôles automatiques.**`
        //     }
        //
        // }
        //
        // interaction.guild.storage.save()
        //
        // return interaction.reply({ embeds: [
        //     new StandardEmbed()
        //         .setTitle('AutoRole')
        //         .setDescription(message + ' Vous pouvez consulter la liste à tout moment avec /unknown')
        //     ]
        // })

        const modify = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('modify')
                    .setLabel('Modifier la liste des rôles automatiques')
                    .setStyle(ButtonStyle.Secondary)
            )

        const toggle = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('disable')
                    .setLabel((interaction.guild.storage.data.autorole.state ? 'Désa' : 'A') + 'ctiver les rôles automatiques')
                    .setStyle(ButtonStyle.Secondary)
            )

        await interaction.reply({
            embeds: [
                new StandardEmbed()
                    .setTitle('Rôles automatiques')
                    .setDescription('Bienvenue dans l\'utilitaire de gestion des rôles automatiques.\nQue souhaitez-vous faire ?')
            ],
            components: [modify, toggle]
        })

        interaction.guild.storage.data.interaction[interaction.id] = InteractionMenu.AutoroleDefault
        interaction.guild.storage.save()
    }
}
