import * as fs from 'fs';

export interface GuildConfig {
    prefix: string;
    // Autres propriétés de configuration spécifiques au serveur
}

export interface BotData {
    guilds: Record<string, GuildConfig>; // Enregistre la configuration de chaque serveur par ID
    // Autres données que vous souhaitez stocker
}

export class JSONDataHandler {
    private filePath: string;
    private botData: BotData;

    constructor(filePath: string) {
        this.filePath = filePath;
        this.botData = this.loadDataFromFile();
    }

    private loadDataFromFile(): BotData {
        try {
            const data = fs.readFileSync(this.filePath, 'utf-8');
            return JSON.parse(data) as BotData;
        } catch (error) {
            console.error(`Impossible de charger les données du fichier ${this.filePath}: ${error.message}`);
            return { guilds: {} };
        }
    }

    public getGuildConfig(guildId: string): GuildConfig {
        return this.botData.guilds[guildId] || { prefix: '!' }; // Retourne une configuration de préfixe par défaut si aucune configuration n'existe pour ce serveur
    }

    public setGuildConfig(guildId: string, config: GuildConfig): void {
        this.botData.guilds[guildId] = config;
        this.saveDataToFile();
    }

    private saveDataToFile(): void {
        try {
            const data = JSON.stringify(this.botData, null, 2);
            fs.writeFileSync(this.filePath, data, 'utf-8');
        } catch (error) {
            console.error(`Impossible de sauvegarder les données dans le fichier ${this.filePath}: ${error.message}`);
        }
    }
}