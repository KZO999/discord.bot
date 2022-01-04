const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Permite obtener la información básica del bot'),
    async execute(interaction, client) {
        const helpEmbed = new MessageEmbed()
            .setTitle("Ayuda")
            .setDescription("Información Básica del Bot")
            .addFields({
                name: 'Comandos Divertidos:',
                value: '/ping (Permite hacer que el bot te responda con pong)',
            }, {
                name: 'Comandos de Información',
                value: '/info (Permite obtener la información sobre un usuario o el servidor)',
            }, {
                name: 'Para obtener más información acerca de un comando:',
                value: '/help command:<comando>'
            })
            .setTimestamp()
            .setColor('RANDOM')
            .setFooter(client.user.tag, client.user.displayAvatarURL());

        await interaction.reply({
            embeds: [helpEmbed]
        });
    }
}