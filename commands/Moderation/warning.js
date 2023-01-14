const { EmbedBuilder } = require('discord.js');
const { uuid } = require('uuidv4');
const { WarningsSchema } = require('../../schemas/main');

module.exports = {
    name: 'warn',
    description: 'Add or delete a warning from a user.',
    type: 1,
    options: [
        {
            name: 'add',
            description: 'Add a warning to a user.',
            type: 1,
            options: [
                {
                    name: 'user',
                    description: 'The user to warn.',
                    type: 6,
                    required: true
                },
                {
                    name: 'reason',
                    description: 'The reason for the warn.',
                    type: 3,
                    required: false
                }
            ]
        },
        {
            name: 'delete',
            description: 'Delete a warning from a user.',
            type: 1,
            options: [
                {
                    name: 'user',
                    description: 'The user to delete one of their warnings.',
                    type: 6,
                    required: true
                },
                {
                    name: 'id',
                    description: 'The warn ID.',
                    type: 3,
                    required: true
                }
            ]
        },
        {
            name: 'clear',
            description: 'Clear all warnings data from a user.',
            type: 1,
            options: [
                {
                    name: 'user',
                    description: 'The user to delete all their warnings.',
                    type: 6,
                    required: true
                }
            ]
        }
    ],
    role_perms: ['981187294927142912'],
    developers_only: false,
    category: 'Moderation',
    run: async (client, interaction) => {

        const subCommandInput = interaction.options._subcommand;

        if (subCommandInput === 'add') {
            const userInput = interaction.options.get('user').value;
            const reasonInput = interaction.options.get('reason')?.value || "No reason was provided";

            const user = interaction.guild.members.cache.get(userInput);

            if (!user) return interaction.reply({
                content: `\`❌\` The user is invalid.`,
                ephemeral: true
            });

            WarningsSchema.findOne(
                {
                    user: userInput,
                    guild: interaction.guild.id
                }, async (err, data) => {
                    if (err) throw err;

                    const uuidGenerated = uuid();

                    if (!data) {
                        data = new WarningsSchema(
                            {
                                user: userInput,
                                guild: interaction.guild.id,
                                warnings: [
                                    {
                                        moderator: interaction.user.id,
                                        since: new Date(),
                                        warnId: uuidGenerated,
                                        reason: reasonInput
                                    }
                                ]
                            }
                        );

                        interaction.reply({
                            content: `\`✅\` ${user} has been successfully warned. (Total: \`1\`)`,
                            ephemeral: true
                        });
                    } else {
                        data.warnings.push(
                            {
                                moderator: interaction.user.id,
                                since: new Date(),
                                warnId: uuidGenerated,
                                reason: reasonInput
                            }
                        );

                        interaction.reply({
                            content: `\`✅\` ${user} has been successfully warned. (Total: \`${data.warnings.length}\`)`,
                            ephemeral: true
                        });
                    };

                    data.save();

                    user.send({
                        content: `You have been warned from **${interaction.guild.name}**. ${reasonInput}`
                    }).catch(() => { });

                    interaction.channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`${user} has been warned${reasonInput === 'No reason was provided' ? '.' : ` for: ${reasonInput}`}`)
                                .setFooter({
                                    text: `UUID: ${uuidGenerated}`
                                })
                                .setColor('Yellow')
                        ]
                    });
                }
            );
        };

        if (subCommandInput === 'delete') {
            const userInput = interaction.options.get('user').value;
            const idInput = interaction.options.get('id').value;

            const user = interaction.guild.members.cache.get(userInput);
            if (!user) return interaction.reply({
                content: '\`❌\` The user is invalid.',
                ephemeral: true
            });

            WarningsSchema.findOne(
                {
                    user: userInput,
                    guild: interaction.guild.id
                }, async (err, data) => {
                    if (err) throw err;

                    if (data && data.warnings?.length > 0) {
                        let boolean = false;

                        for (let warns of data.warnings) {
                            if (warns.warnId === idInput) boolean = true;
                        };

                        if (boolean === false) return interaction.reply({
                            content: `\`❌\` Invalid UUID format or ID.`,
                            ephemeral: true
                        });

                        const arr = data.warnings.filter(object => {
                            return object.warnId !== idInput
                        });

                        data.warnings = arr;

                        data.save();

                        return interaction.reply({
                            content: `\`✅\` The warning ID \`${idInput}\` has been deleted from ${user}'s data.`,
                            ephemeral: true
                        });
                    } else {
                        return interaction.reply({
                            content: `\`❌\` ${user} is having no warnings (data is empty).`,
                            ephemeral: true
                        });
                    };
                }
            );
        };

        if (subCommandInput === 'clear') {
            const userInput = interaction.options.get('user').value;

            const user = interaction.guild.members.cache.get(userInput);
            if (!user) return interaction.reply({
                content: '\`❌\` The user is invalid.',
                ephemeral: true
            });

            WarningsSchema.findOne(
                {
                    user: userInput,
                    guild: interaction.guild.id
                }, async (err, data) => {
                    if (err) throw err;

                    if (data && data.warnings?.length > 0) {
                        await WarningsSchema.deleteOne({
                            user: userInput,
                            guild: interaction.guild.id
                        });

                        return interaction.reply({
                            content: `\`✅\` Deleted all ${user}'s data.`,
                            ephemeral: true
                        });
                    } else {
                        return interaction.reply({
                            content: `\`❌\` ${user} is having no warnings (data is empty).`,
                            ephemeral: true
                        });
                    };
                }
            );
        };

    },
};