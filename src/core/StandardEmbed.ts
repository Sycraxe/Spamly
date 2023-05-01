import { EmbedBuilder } from 'discord.js';

export class StandardEmbed extends EmbedBuilder {
    constructor() {
        super();
        this.setColor("#16161D")
        this.setFooter({ text: "Pour plus d'informations concernant, exécutez la commande /help" })
    }
}
