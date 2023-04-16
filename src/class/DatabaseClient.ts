import {Client, Guild, Collection, Role} from 'discord.js';

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
    guild: Guild
    autorole: AutoroleManager

    constructor(guild) {
        this.guild = guild
        this.autorole = new AutoroleManager()
    }

}

class AutoroleManager {
    public state: boolean
    public roles: Collection<string, Role>

    constructor() {
        this.state = false
        this.roles = new Collection()
    }


    public add(role: Role): void {
        this.roles.set(role.id, role)
    }

    public remove(role: Role): void {
        this.roles.delete(role.id)
    }
}