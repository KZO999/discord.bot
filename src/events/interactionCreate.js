module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.log('Ha habido un error:\n' + error);
            await interaction.reply({
                content: 'Ha habido un error ejecutando el comando',
                ephemeral: true
            });
        }
    },
};