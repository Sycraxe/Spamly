import {SlashCommandBuilder} from 'discord.js';
import {AutoroleMainMenu} from "../menus/autorole";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('autorole')
        .setDescription("Attribut automatiquement des rôles aux nouveaux arrivants"),

    async execute(interaction) {
        await interaction.reply(AutoroleMainMenu(interaction))
    }
}
