import { SlashCommandBuilder } from 'discord.js';
import { StandardEmbed } from '../class/StandardEmbed';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription("Gère les invitations du serveur")
        .addSubcommand(subcommand =>
            subcommand
                .setName('create')
                .setDescription("Crée une invitation")
                .addChannelOption(option =>
                    option
                        .setName('channel')
                        .setDescription('Le salon où doit pointer le lien')
                        .setRequired(true))
                .addIntegerOption(option =>
                    option
                        .setName('age')
                        .setDescription('Le nombre de secondes de validité du lien (0 pour l\'infini)')
                        .setMinValue(0)
                        .setMaxValue(604800)
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('list')
                .setDescription("Liste les invitations"))
        .addSubcommand(subcommand =>
            subcommand
                .setName('delete')
                .setDescription("Supprime une invitation")
                .addStringOption(option =>
                    option
                        .setName('invite')
                        .setDescription("Le lien ou le code d'invitation")
                        .setRequired(true))),

    async execute(interaction) {

        if (interaction.options.getSubcommand() === 'create') {
            const channel = interaction.options.getChannel('channel')
            const age = interaction.options.getInteger('age')

            await interaction.guild.invites.create(channel.id, {maxAge: age})

            return interaction.reply({ embeds: [
                    new StandardEmbed()
                        .setTitle('Invite')
                        .setDescription('Invitation créée avec succès')
                ]
            })

        } else if (interaction.options.getSubcommand() === 'list') {

            const invites = await interaction.guild.invites.fetch().then()
            let fields = []

            for (const [key, value] of invites) {
                fields.push({ name: 'https://discord.gg/' + key, value: 'par <@' + value.inviterId + '> \nvers <#' + value.channelId + '>' })
            }

            return interaction.reply({ embeds: [
                new StandardEmbed()
                    .setTitle('Invite')
                    .setDescription('Voici les différents liens actuellement valides sur le serveur')
                    .setFields(fields)
                ]
            })
        } else if (interaction.options.getSubcommand() === 'delete') {
            const string = interaction.options.getString('invite')

            const code = string.match(/(https?:\/\/)?(discord\.gg\/)?(.*)/)[3]
            try {
                const invite = await interaction.guild.invites.fetch({code: code, force: true}).then()
                invite.delete()

                return interaction.reply({ embeds: [
                        new StandardEmbed()
                            .setTitle('Invite')
                            .setDescription('L\'invitation fournie a été supprimée avec succès')
                    ]
                })

            } catch {

                return interaction.reply({ embeds: [
                        new StandardEmbed()
                            .setTitle('Invite')
                            .setDescription('L\'invitation fournie n\'est pas valide')
                    ]
                })

            }
        }
    }
}
