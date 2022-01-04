const mongoose = require("mongoose");
const fs = require('fs');
const mongoEventFiles = fs.readdirSync("./src/mongooseEvents").filter(file => file.endsWith(".js"));

module.exports = (client) => {
    client.dbLogin = async () => {
        for (file of mongoEventFiles) {
            const event = require(`../mongooseEvents/${file}`);
            if (event.once) {
                mongoose.connection.once(event.name, (...args) => event.execute(...args));
            } else {
                mongoose.connection.on(event.name, (...args) => event.execute(...args));
            }
        }
        mongoose.Promise = global.Promise;
        await mongoose.connect(process.env.dbToken, {
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    };
};