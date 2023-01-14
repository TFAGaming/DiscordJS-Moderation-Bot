const fs = require('fs');
const { PermissionsBitField } = require('discord.js');
const { betterConsole, Colors, ApplicationCommandsRegister } = require('discord.js-v14-helper');

module.exports = (client, config) => {
    let commands = [];

    fs.readdirSync('./commands/').forEach((dir) => {
        const files = fs.readdirSync('./commands/' + dir)
            .filter((file) => file.endsWith('.js'))

        for (let file of files) {
            let pulled = require('../commands/' + dir + '/' + file);

            if (pulled.name && pulled.type) {
                console.log(
                    betterConsole('Loaded application command: ' + file + '.', {
                        color: Colors.GREEN
                    })
                );

                if (pulled.description) {
                    commands.push(
                        {
                            name: pulled.name,
                            description: pulled.description,
                            type: 1,
                            options: pulled.options ? pulled.options : null,
                            default_permission: null, // No need because it's deprecated.
                            default_member_permissions: null, // "role_perms" replaced this.
                            nsfw: false // Because there is no NSFW commands.
                        }
                    );
                } else {
                    commands.push(
                        {
                            name: pulled.name,
                            type: pulled.type
                        }
                    );
                };

                client.commands.set(pulled.name, pulled);
            } else {
                console.log(
                    betterConsole('[!] Received empty property \'name\' or \'type\' in ' + file + '.', {
                        color: Colors.RED
                    })
                );

                continue;
            };
        };
    });

    new ApplicationCommandsRegister(config.client.token, config.client.id)
        .setApplicationCommands(commands)
        .setRestVersion(10)
        .startRegistering({
            logWhenFinishedRegistering: true,
            logWhenStartRegistering: true
        });
};