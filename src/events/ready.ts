import { Events } from 'discord.js';

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute() {
        console.log('Prêt!')
    },
};