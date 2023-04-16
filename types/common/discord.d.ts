import { Collection } from 'discord.js';
import { DatabaseManager } from '../../src/class/DatabaseClient';

declare module 'discord.js' {
    export interface Client {
        commands?: Collection<unknown, any>
    }

    export interface Guild {
        data?: DatabaseManager
    }
}