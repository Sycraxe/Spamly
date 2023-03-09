const { SlashCommandBuilder, EmbedBuilder} = require('discord.js')

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
                .setDescription("Liste les invitations")),

    async execute(interaction) {
        const channel = interaction.options.getChannel('channel')
        const age = interaction.options.getInteger('age')

        if (interaction.options.getSubcommand() === 'create') {

            await interaction.guild.invites.create(channel.id, {maxAge: age})

            return interaction.reply({ embeds: [
                    new EmbedBuilder()
                        .setColor('#16161d')
                        .setTitle('Invite')
                        .setDescription('Invitation créée avec succès')
                        .setFooter({ text: `Pour plus d'informations concernant ${interaction.client.user.username}, exécutez la commande /help` })
                ]
            })

        } else if (interaction.options.getSubcommand() === 'list') {

            const invites = await interaction.guild.invites.fetch().then()
            let fields = []

            for (const [key, value] of invites) {
                fields.push({ name: 'https://discord.gg/' + key, value: 'par <@' + value.inviterId + '> \nvers <#' + value.channelId + '>' })
            }

            return interaction.reply({ embeds: [
                new EmbedBuilder()
                    .setColor('#16161d')
                    .setTitle('Invite')
                    .setDescription('Voici les différents liens actuellement valides sur le serveur')
                    .setFields(fields)
                    .setFooter({ text: `Pour plus d'informations concernant ${interaction.client.user.username}, exécutez la commande /help` })
                ]
            })
        }
    }
}
