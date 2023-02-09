const { } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'client',
    description: 'Set name/presence to the client.',
    type: 1,
    options: [
        {
            name: 'set-name',
            description: 'Set the client\'s username.',
            type: 1,
            options: [
                {
                    name: 'name',
                    description: 'The client\'s new username.',
                    type: 3,
                    required: true
                }
            ]
        },
        {
            name: 'set-presence',
            description: 'Set the client\'s presence.',
            type: 1,
            options: [
                {
                    name: 'activity',
                    description: 'The client\'s new activity.',
                    type: 3,
                    required: true
                },
                {
                    name: 'activity-type',
                    description: 'The client\'s new activity type.',
                    type: 3,
                    choices: [
                        {
                            name: 'Playing',
                            value: "0"
                        },
                        {
                            name: 'Streaming',
                            value: "1"
                        },
                        {
                            name: 'Listening',
                            value: "2"
                        },
                        {
                            name: 'Watching',
                            value: "3"
                        },
                        {
                            name: 'Competing',
                            value: "5"
                        }
                    ],
                    required: false
                },
                {
                    name: 'status',
                    description: 'The client\'s new status.',
                    type: 3,
                    choices: [
                        {
                            name: 'Online',
                            value: 'online'
                        },
                        {
                            name: 'Do not Disturb',
                            value: 'dnd'
                        },
                        {
                            name: 'Idle',
                            value: 'idle'
                        },
                        {
                            name: 'Invisible',
                            value: 'invisible'
                        }
                    ],
                    required: false
                }
            ]
        },
        {
            name: 'destroy',
            description: 'This will going to destroy the client and re-login again.',
            type: 1,
            options: []
        },
        {
            name: 'stop',
            description: 'Kill the entire bot process (THIS IS NOT SAFE TO USE).',
            type: 1,
            options: []
        }
    ],
    role_perms: null,
    developers_only: false,
    owner_only: true,
    category: 'Developers',
    run: async (client, interaction, config) => {

        const subCommandInput = interaction.options._subcommand;

        await interaction.reply({
            content: `\`•••\` Please wait...`,
            ephemeral: true
        });

        if (subCommandInput === 'set-name') {
            const nameInput = interaction.options.get('name').value;

            try {
                await client.user.setUsername(nameInput);

                return interaction.editReply({
                    content: `\`✅\` Client\'s username has been changed to **${nameInput}**.`,
                    ephemeral: true
                });
            } catch (err) {
                return interaction.editReply({
                    content: `\`❌\` An error was found:\n${err}`,
                    ephemeral: true
                });
            };
        };

        if (subCommandInput === 'set-presence') {
            const activityInput = interaction.options.get('activity').value;
            const activityTypeInput = interaction.options.get('activity-type')?.value || 0;
            const statusInput = interaction.options.get('status')?.value || 'online';

            try {
                await client.user.setPresence({ activities: [{ name: activityInput, type: parseInt(activityTypeInput) }], status: statusInput });

                const newPresenceData = {
                    activity: activityInput,
                    activity_type: activityTypeInput,
                    status: statusInput
                };

                await fs.writeFileSync('././JSON/presence.json', JSON.stringify(newPresenceData));

                return interaction.editReply({
                    content: `\`✅\` Client\'s presence has been changed.`,
                    ephemeral: true
                });
            } catch (err) {
                return interaction.editReply({
                    content: `\`❌\` An error was found:\n${err}`,
                    ephemeral: true
                });
            };
        };

        if (subCommandInput === 'destroy') {
            try {
                await interaction.editReply({
                    content: `\`•••\` Started destroying the client and re-logging again...`,
                    ephemeral: true
                });
                
                await client.destroy();

                await client.login(require('../../config/main').client.token);

                const data = await JSON.parse(fs.readFileSync('././JSON/presence.json', 'utf-8'));

                await client.user.setPresence({ activities: [{ name: data.activity, type: parseInt(data.activity_type) }], status: data.status });

                return interaction.editReply({
                    content: `\`✅\` Logged in as **${client.user.username}**.`,
                    ephemeral: true
                });
            } catch (err) {
                return interaction.editReply({
                    content: `\`❌\` An error was found:\n${err}`,
                    ephemeral: true
                }).catch(() => { });
            };
        };

        if (subCommandInput === 'stop') {
            try {
                await interaction.editReply({
                    content: `\`👋\` Goodbye world!`,
                    ephemeral: true
                });

                return process.exit(1);
            } catch (err) {
                return interaction.editReply({
                    content: `\`❌\` An error was found:\n${err}`,
                    ephemeral: true
                }).catch(() => { });
            };
        };
        
    }
};
