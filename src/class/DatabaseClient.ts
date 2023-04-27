import {Client, Guild, Collection} from 'discord.js';
import * as fs from 'fs';

export class DatabaseClient extends Client {

    public path: string

    constructor(options, path) {
        super(options);
        this.path = path;

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

    public save(dataset: string): boolean {
        if (!this.exists(dataset)) return false

        if (!fs.existsSync(this.guild.client.path + '/' + this.guild.id)) {
            try {
                fs.mkdirSync(this.guild.client.path + '/' + this.guild.id, {recursive: true})
            }
            catch (error) {
                return false
            }
        }

        try {
            fs.writeFileSync(this.guild.client.path + '/' + this.guild.id + '/' + dataset + '.json',
                JSON.stringify(Object.fromEntries(this.collections.get(dataset)), null, 2),
                {encoding: 'utf-8'});
            return true
        }
        catch (error) {
            return false
        }
    }

    public load(dataset: string): boolean {
        if (!this.exists(dataset)) this.create(dataset)
        if (!fs.existsSync(this.guild.client.path + '/' + this.guild.id + '/' + dataset + '.json')) return false

        try {
            const json = JSON.parse(fs.readFileSync(this.guild.client.path + '/' + this.guild.id + '/' + dataset + '.json', { encoding: 'utf-8'}))

            for (let key in json) {
                this.collections.get(dataset).set(key, json[key]);
            }

            console.log(this.collections.get(dataset));
            return true
        }
        catch (error) {
            return false
        }

    }

}