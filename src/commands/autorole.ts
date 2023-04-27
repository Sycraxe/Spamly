import { SlashCommandBuilder } from 'discord.js';
import { StandardEmbed } from '../class/StandardEmbed';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('autorole')
        .setDescription("Configure la liste des rôles automatiquement attribués aux nouveaux arrivants")
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription("Ajoute un rôle à la liste des rôles automatiques")
                .addRoleOption(option =>
                    option
                        .setName('role')
                        .setDescription('Le rôle à ajouter')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription("Retire un rôle de la liste des rôles automatiques")
                .addRoleOption(option =>
                    option
                        .setName('role')
                        .setDescription('Le rôle à retirer')
                        .setRequired(true))),

    async execute(interaction) {
        const role = interaction.options.getRole('role')

        if (!interaction.guild.data.exists('autorole')) interaction.guild.data.load('autorole')
        let message = ""

        if (interaction.options.getSubcommand() === 'add') {
            if (!interaction.guild.data.exists('autorole')) interaction.guild.data.create('autorole')

            if (!interaction.guild.data.get('autorole', role.id)) {
                interaction.guild.data.set('autorole', role.id, true)
                message = `**Le rôle <@&${role.id}> a été ajouté à la liste des rôles automatiques avec succès.**`
            } else {
                message = `**Le rôle <@&${role.id}> est déjà présent dans la liste des rôles automatiques.**`
            }
        }

        else if (interaction.options.getSubcommand() === 'remove') {
            if (!interaction.guild.data.exists('autorole')) interaction.guild.data.create('autorole')

            if (interaction.guild.data.get('autorole', role.id)) {
                interaction.guild.data.set('autorole', role.id, false)
                message = `**Le rôle <@&${role.id}> a bien été retiré de la liste des rôles automatiques.**`
            } else {
                message = `**Le rôle <@&${role.id}> n'est pas présent dans la liste des rôles automatiques.**`
            }

        }

        interaction.guild.data.save('autorole')

        return interaction.reply({ embeds: [
            new StandardEmbed()
                .setTitle('AutoRole')
                .setDescription(message + ' Vous pouvez consulter la liste à tout moment avec /unknown')
            ]
        })

    }
}
