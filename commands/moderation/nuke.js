const { ApplicationCommandOptionType, ApplicationCommandType, EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'nuke',
    description: "¡Limpia TODOS los mensajes de este canal!",
    cooldown: 1000,
    userPerms: ['ManageMessages'],
    botPerms: ['ManageMessages'],

    run: async (client, message, args) => {
        const Reason = args.slice(1).join(' ') || 'Razón no añadida'

        const channelCloned = await message.channel.clone();

        if (channelCloned) {
            await message.channel.delete();
        }
    }
}