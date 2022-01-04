const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Permite ver tu ping y el del bot'),
    async execute(interaction, client) {
        await interaction.reply(`Pong!\nLa latencia es de ${Date.now() - interaction.createdTimestamp}ms\nLatencia de API: ${Math.round(client.ws.ping)}ms`);
    }
}