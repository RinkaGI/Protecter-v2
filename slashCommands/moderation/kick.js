const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, PermissionsBitField} = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kickea a una persona!',
    cooldown: 1000,
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'KickMembers',

    options: [
        {
            name: 'usuario', description: '¿A qué usuario quieres kickear?',
            type: ApplicationCommandOptionType.User, required: true
        },

        {
            name: 'razón', description: '¿Por qué quieres kickearle?',
            type: ApplicationCommandOptionType.String, required: false
        }
    ],

    run: async (client, interaction) => {
        const Target = interaction.options.getMember('usuario');
        const Reason = interaction.options.getString('razón') || 'Ninguna razón fue añadida.'

        const embed1 = new EmbedBuilder()
        .setTitle("> :x: Problema al kickear :x:")
        .setDescription(`<:flecha:1027368636572237915> Al parecer, admin, no puedes kickearte a ti mismo.`)
        .setColor(0x5A9EC9)
        .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
        .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
        .setTimestamp(new Date())
        .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        if (Target.id === interaction.member.id){
            return interaction.reply({embeds: [
                embed1
            ]})
        }

        const embed2 = new EmbedBuilder()
            .setTitle("> :x: Problema al kickear :x:")
            .setDescription(`<:flecha:1027368636572237915> Al parecer, admin, no puedes kickearme.`)
            .setColor(0x5A9EC9)
            .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
            .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
            .setTimestamp(new Date())
            .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")
        
        if (Target.id == process.env.CLIENT_ID){
            return interaction.reply({embeds: [embed2]})
        }

        const embed3 = new EmbedBuilder()
            .setTitle("> :x: Problema al kickear :x:")
            .setDescription(`<:flecha:1027368636572237915> ¡No se puede kickear a un admin!`)
            .setColor(0x5A9EC9)
            .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
            .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
            .setTimestamp(new Date())
            .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        if (Target.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({embeds: [embed3]})
        }

        const embed4 = new EmbedBuilder()
            .setTitle("> :x: Problema al banear :x:")
            .setDescription(`<:flecha:1027368636572237915> La razón no puede superar los 512 carácteres.`)
            .setColor(0x5A9EC9)
            .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
            .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
            .setTimestamp(new Date())
            .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        if (Reason.length >= 512){
            return interaction.reply({embeds: [embed4]})
        }

        const embed5 = new EmbedBuilder()
            .setTitle("> :white_check_mark: ¡Se ha kickeado exitosamente!")
            .addFields(
                {
                    name: ">> Usuario",
                    value: `<:flecha:1027368636572237915> **Nombre:** ${String(Target.user.username)} \n <:flecha:1027368636572237915> **Tag:** ${Target.user.discriminator} \n <:flecha:1027368636572237915> **ID:** ${Target.id}`,
                    inline: false
                },

                {
                    name: '>> Información del kickeo',
                    value: `<:flecha:1027368636572237915> **Razón:** ${Reason}`,
                    inline: false
                }
            )
            .setColor(0x5A9EC9)
            .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
            .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
            .setTimestamp(new Date())
            .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

            const embed6 = new EmbedBuilder()
                .setTitle("> :x: ¡Has sido kickeado!")
                .setDescription(`¡Has sido kickeado del servidor ${interaction.guild.name}!`)
                .addFields(
                    {
                        name: "**Usuario**",
                        value: `<:flecha:1027368636572237915> **Nombre:** ${Target.user.username} \n <:flecha:1027368636572237915> **Discriminador:** ${String(Target.user.discriminator)} \n <:flecha:1027368636572237915> **ID:** ${Target.user.id}`,
                        inline: true
                    },

                    {
                        name: '**Información del kickeo:**',
                        value: `<:flecha:1027368636572237915> **Razón:** ${Reason}`,
                        inline: true
                    }
                )
                .setColor(0x5A9EC9)
                .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
                .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
                .setTimestamp(new Date())
                .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

                Target.send({embed: [embed6]}).catch(error => {console.log(error.stack)})

                Target.kick({
                    reason: Reason
                })
                
                interaction.reply({embeds: [embed5]})
    }
}