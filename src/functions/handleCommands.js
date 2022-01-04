const {
    REST
} = require('@discordjs/rest');
const {
    Routes
} = require('discord-api-types/v9');
const fs = require('fs');
require('dotenv').config();

const clientId = process.env.clientId;
const guildId = process.env.guildId

module.exports = (client) => {
    client.handleCommands = async (commandsFolders, path) => {
        client.commandArray = [];
        for (folder of commandsFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith(".js"));

            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);
                client.commands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());
            }
        }
        const rest = new REST({
            version: '9'
        }).setToken(process.env.Token);

        (async () => {
            try {
                console.log('Se está comenzado a refrescar los (/) comandos.');

                await rest.put(
                    Routes.applicationCommands(clientId, guildId), {
                        body: client.commandArray
                    },
                );

                console.log('Se han refrescado los (/) comandos.')
            } catch (error){
                console.log('Ha habido un error:\n' + error)
            }
        })();
    };
};