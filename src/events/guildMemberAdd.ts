import { Events } from 'discord.js';

module.exports = {
    name: Events.GuildMemberAdd,
    execute(member) {
        if (!member.guild.storage.data.autorole.state) return
        member.guild.storage.data.autorole.roles.forEach((id) => {
            let role = member.guild.roles.cache.get(id)
            if (!role) return
            if (role.comparePositionTo(member.guild.members.me.roles.highest) > 0) return
            member.roles.add(role)
        })
    },
};