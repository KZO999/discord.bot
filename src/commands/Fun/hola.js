const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hola')
        .setDescription('Permite que el bot te de un saludo'),
    async execute(interaction) {
        await interaction.reply('Holaaa!!!');
    }
}