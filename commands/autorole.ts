const { SlashCommandBuilder } = require('discord.js')
const { StandardEmbed } = require('../embed.ts')

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

    async execute(interaction, AutoRole) {
        const role = interaction.options.getRole('role')

        let message = ""

        await interaction.client.user.fetch()

        if (interaction.options.getSubcommand() === 'add') {
            try {
                await AutoRole.create({ role_id: role.id, guild_id : interaction.guild.id })
                message = `**Le rôle <@&${role.id}> a été ajouté à la liste des rôles automatiques avec succès.**`
            }
            catch (error) {
                if (error.name === 'SequelizeUniqueConstraintError') message = `**Le rôle <@&${role.id}> est déjà présent dans la liste des rôles automatiques.**`
                else message = `**Le rôle <@&${role.id}> n'a pas pu être ajouté dans la liste des rôles automatiques pour une raison inconnue.**`
            }
        }

        else if (interaction.options.getSubcommand() === 'remove') {
            const rowCount = await AutoRole.destroy({ where: { role_id: role.id, guild_id : interaction.guild.id } })
            if (!rowCount) message = `**Le rôle <@&${role.id}> n'est pas présent dans la liste des rôles automatiques.**`
            else message = `**Le rôle <@&${role.id}> a bien été retiré de la liste des rôles automatiques.**`
        }

        return interaction.reply({ embeds: [
            new StandardEmbed()
                .setTitle('AutoRole')
                .setDescription(message + ' Vous pouvez consulter la liste à tout moment avec /unknown')
            ]
        })

    }
}
