import { Events } from 'discord.js';

module.exports = {
    name: Events.GuildMemberAdd,
    execute(member) {
        if (!member.guild.storage.data.autorole.enabled) return
        member.guild.storage.data.autorole.roles.forEach((id) => {
            let role = member.guild.roles.cache.get(id)
            if (!role) return
            member.roles.add(role)
        })
    },
};