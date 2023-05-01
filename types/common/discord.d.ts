import { Collection } from 'discord.js';
import { DatabaseManager } from '../../src/core/DatabaseClient';

declare module 'discord.js' {
    export interface Client {
        commands?: Collection<unknown, any>
        path?: string
        init?: Function
    }

    export interface Guild {
        storage?: DatabaseManager
    }
}