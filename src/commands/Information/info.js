const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Permite obtener información.')
        .addSubcommand(subcommand => 
            subcommand
             .setName("usuario")
             .setDescription("Permite obtener la información del usuario mencionado.")
             .addUserOption(option => option.setName("usuario").setDescription("Usuario mencionado")))
        .addSubcommand(subcommand => 
            subcommand
                .setName('server')
                .setDescription("Información acerca del servidor.")),
    async execute(interaction, client) {
        if (interaction.options.getSubcommand() === "user") {
            const user = interaction.options.getUser("usuario");
            if (user) {
                const userEmbed = new MessageEmbed()
                    .setTitle(`${user.username}`)
                    .setDescription(`Información acerca de ${user.username}`)
                    .setAuthor(user.username, user.displayAvatarURL())
                    .addFields(
                        {
                            name: 'Nombre de Usuario',
                            value: 'Su nombre de Usuario es: ' + user.username,
                            inline: true
                        },
                        {
                            name: '\u200B',
                            value: '\u200B',
                            inline: true
                        },
                        {
                            name: 'Etiqueta',
                            value: `Su etiqueta es: #${user.discriminator}`,
                            inline: true
                        },
                    )
                    .setTimestamp()
                    .setColor('RANDOM')
                    .setFooter(client.user.tag, client.user.displayAvatarURL());

                await interaction.reply({ embeds: [userEmbed] });
            } else {
                await interaction.reply(`Su nombre de usuario: ${interaction.user.username}\nSu ID: ${interaction.user.id}`);
            }
        } else if (interaction.options.getSubcommand() === "server") {
            await interaction.reply(`Nombre del Servidor: ${interaction.guild.name}\nTotal de Miembros: ${interaction.guild.memberCount}`)
        } else {
            await interaction.reply("Usted no ha seleccionado ningún subcomando.")
        }
    }
}