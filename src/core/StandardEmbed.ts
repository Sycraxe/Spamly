import { EmbedBuilder } from 'discord.js';

export class StandardEmbed extends EmbedBuilder {
    constructor() {
        super();
        this.setColor("#4E5058")
        this.setFooter({ text: "Pour plus d'informations me concernant, exécutez la commande /help" })
    }
}
