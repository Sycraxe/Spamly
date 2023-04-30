import {Client, Guild} from 'discord.js';
import * as fs from 'fs';

export class DatabaseClient extends Client {

    public path: string
    public init: Function

    constructor(options, path, init) {
        super(options);
        this.path = path;
        this.init = init;

        Object.defineProperty(Guild.prototype, 'storage', {
            get: function() {
                if (!this._storage) {
                    this._storage = new DatabaseManager(this);
                }
                return this._storage;
            }
        });
    }
}

export class DatabaseManager {
    public readonly guild: Guild;
    private _data: { [key: string]: any };

    constructor(guild) {
        this.guild = guild;
        this._data = {};
        this.load();
        this.guild.client.init(this)
        this.save();
    }

    public set data(value: { [key: string]: any }) {
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            this._data = value;
        }
    }

    public get data(): { [key: string]: any } {
        return this._data;
    }

    public save(): boolean {
        if (!fs.existsSync(this.guild.client.path)) {
            try {fs.mkdirSync(this.guild.client.path, {recursive: true})}
            catch (error) {return false}
        }

        try {fs.writeFileSync(this.guild.client.path + '/' + this.guild.id + '.json',
            JSON.stringify(this._data, null, 2), {encoding: 'utf-8'});
            return true
        } catch (error) {return false}
    }

    public load(): boolean {
        if (!fs.existsSync(this.guild.client.path + '/' + this.guild.id + '.json')) return false

        try {this._data = JSON.parse(fs.readFileSync(
            this.guild.client.path + '/' + this.guild.id + '.json', { encoding: 'utf-8'}))
            return true
        } catch (error) {return false}
    }

}