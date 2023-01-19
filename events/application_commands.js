const client = require('../index');
const config = require('../config/main');
const { ModulesSchema } = require('../schemas/main');

client.on('interactionCreate', async (interaction) => {
    if (interaction.isChatInputCommand() || interaction.isUserContextMenuCommand() || interaction.isMessageContextMenuCommand()) {
        const command = await client.commands.get(interaction.commandName);

        if (!command) return interaction.reply({
            content: `\`❌\` Invalid command, please try again later.`,
            ephemeral: true
        });

        try {
            const data = await ModulesSchema.findOne({
                guild: interaction.guild.id
            });

            if (data) {
                if (command.category) {
                    if (data.modules.includes(command.category)) {
                        return interaction.reply({
                            content: `\`❌\` This command is currently disabled in the module **${command.category}**.`,
                            ephemeral: true
                        });
                    };
                };
            };

            if (command.owner_only && command.owner_only === true) {
                if (command.owner_only !== interaction.user.id) {
                    return interaction.reply({
                        content: `\`❌\` Sorry but this command is restricted for the bot owner only!`,
                        ephemeral: true
                    });
                };
            };

            if (command.developers_only && command.developers_only === true) {
                if (config.users?.developers && config.users?.developers?.length > 0) {
                    if (!config.users.developers.some((dev) => interaction.user.id === dev)) return interaction.reply({
                        content: `\`❌\` Sorry but this command is restricted for developers only!`,
                        ephemeral: true
                    });
                };
            };

            if (command.role_perms && command.role_perms !== null) {
                if (Array.isArray(command.role_perms)) {
                    if (command.role_perms?.length > 0) {
                        let boolean = false;

                        await command.role_perms.forEach((r) => {
                            const role = interaction.guild.roles.cache.get(r);

                            if (!role) return;

                            if (!interaction.member.roles) boolean = false;
                            if (interaction.member.roles.cache.some((r1) => r1.id === role.id)) boolean = true;
                        });

                        if (boolean === false) return interaction.reply({
                            content: `\`❌\` Sorry but you are not allowed to use this command!`,
                            ephemeral: true
                        });
                    };
                } else if (typeof command.role_perms === 'string') {
                    const role = interaction.guild.roles.cache.get(command.role_perms);

                    if (role) {
                        if (!interaction.member.roles.cache.has(role)) return interaction.reply({
                            content: `\`❌\` Sorry but you are not allowed to use this command!`,
                            ephemeral: true
                        });
                    };
                };
            };

            command.run(client, interaction, config);
        } catch (err) {
            console.error(`[!] Failed to run the command \'${interaction.commandName}\'.`);
            console.log(err);
        } finally {
            console.log(`[i] ${interaction.user.username} has used the command \'${interaction.commandName}\'.`);
        };
    } else return;
});