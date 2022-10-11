const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, PermissionsBitField} = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'mute',
    description: 'Mutea a una persona!',
    cooldown: 1000,
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: PermissionsBitField.Flags.MuteMembers,

    options: [
        {
            name: 'usuario',
            description: 'Persona a la que quieres banear',
            type: ApplicationCommandOptionType.User,
            required: true
        },

        {
            name: 'tiempo',
            description: '¿Cuanto tiempo quieres mutearle?',
            type: ApplicationCommandOptionType.String,
            required: true,
        },

        {
            name: 'razón',
            description: '¿Por qué le quieres mutear?',
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ],

    run: async (client, interaction) =>  {
        const Target = interaction.options.getMember('usuario');

        const Time = interaction.options.getString('tiempo');
        const Reason = interaction.options.getString('razón') || 'Mal comportamiento.'

        const embed1 = new EmbedBuilder()
        .setTitle("> :x: Problema al mutear :x:")
        .setDescription(`<:flecha:1027368636572237915> Al parecer, admin, no te puedes mutear a ti mismo.`)
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
        .setTitle("> :x: Problema al mutear :x:")
        .setDescription(`<:flecha:1027368636572237915> Al parecer, admin, no puedes mutearme.`)
        .setColor(0x5A9EC9)
        .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
        .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
        .setTimestamp(new Date())
        .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")
    
        if (Target.id == process.env.CLIENT_ID){
            return interaction.reply({embeds: [embed2]})
        }

        const embed3 = new EmbedBuilder()
        .setTitle("> :x: Problema al mutear :x:")
        .setDescription(`<:flecha:1027368636572237915> ¡No se puede mutear a un admin!`)
        .setColor(0x5A9EC9)
        .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
        .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
        .setTimestamp(new Date())
        .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        if (Target.permissions.has(PermissionsBitField.Flags.Administrator)){
            return interaction.reply({embeds: [embed3]})
        }

        const embed4 = new EmbedBuilder()
        .setTitle("> :x: Problema al mutear :x:")
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
        .setTitle("> :white_check_mark: ¡Se ha muteado exitosamente!")
        .addFields(
            {
                name: "Usuario",
                value: `<:flecha:1027368636572237915> **Nombre:** ${String(Target.user.username)} \n <:flecha:1027368636572237915> **Tag:** ${Target.user.discriminator} \n <:flecha:1027368636572237915> **ID:** ${Target.id}`,
                inline: false
            },

            {
                name: 'Información del muteo',
                value: `<:flecha:1027368636572237915> **Razón:** ${Reason} \n <:flecha:1027368636572237915> **Tiempo:** ${Time} minutos.`,
                inline: false
            }
        )
        .setColor(0x5A9EC9)
        .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
        .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
        .setTimestamp(new Date())
        .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        const embed6 = new EmbedBuilder()
        .setTitle("> :x: ¡Has sido muteado!")
        .setDescription(`<:flecha:1027368636572237915> ¡Has sido muteado del servidor ${interaction.guild.name}!`)
        .addFields(
            {
                name: "**Usuario**",
                value: `<:flecha:1027368636572237915> **Nombre:** ${Target.user.username} \n <:flecha:1027368636572237915> **Discriminador:** ${String(Target.user.discriminator)} \n <:flecha:1027368636572237915> **ID:** ${Target.user.id}`,
                inline: true
            },

            {
                name: '**Información del muteo:**',
                value: `<:flecha:1027368636572237915> **Razón:** ${Reason} \n <:flecha:1027368636572237915> **Tiempo:** ${Time} minutos.`,
                inline: true
            }
        )
        .setColor(0x5A9EC9)
        .setAuthor({name: "Protecter v2", iconURL: "https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png"})
        .setFooter({text: "Protecter v2 | ¡Lo mejor para tu seguridad!"})
        .setTimestamp(new Date())
        .setThumbnail("https://cdn.discordapp.com/attachments/965019683872964608/965020564001521764/unknown.png")

        Target.send({embed: [embed6]}).catch(error => {console.log(error.stack)})


        await Target.timeout(ms(Time), Reason)
        
        interaction.reply({embeds: [embed5]})
    }
}