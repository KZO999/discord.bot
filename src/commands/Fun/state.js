const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('estado')
        .setDescription('Permite conocer el estado del bot'),
    async execute(interaction) {
        await interaction.reply('Yo estoy perfectamente.');
    }
}