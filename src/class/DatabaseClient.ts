import {Client, Guild, Collection} from 'discord.js';

export class DatabaseClient extends Client {

    constructor(options) {
        super(options);

        Object.defineProperty(Guild.prototype, 'data', {
            get: function() {
                if (!this._data) {
                    this._data = new DatabaseManager(this);
                }
                return this._data;
            }
        });
    }
}

export class DatabaseManager {
    public readonly guild: Guild
    private collections: Collection<string, Collection<any, any>>

    constructor(guild) {
        this.guild = guild
        this.collections = new Collection()
    }

    public create(dataset: string) {
        this.collections.set(dataset, new Collection<any, any>)
    }

    public delete(dataset: string): boolean {
        return this.collections.delete(dataset)
    }

    public set(dataset: string, key: string, value: any): void {
        this.collections.get(dataset).set(key, value)
    }

    public get(dataset: string, key: string): any {
        if (!this.exists(dataset)) {
            return undefined
        }
        return this.collections.get(dataset).get(key)
    }

    public exists(dataset: string): boolean {
        return this.collections.has(dataset)
    }

    public forEach(dataset: string, callback: (value: any, key: string) => void) {
        if (!this.exists(dataset)) {
            return
        }
        this.collections.get(dataset).forEach(callback)
    }

}