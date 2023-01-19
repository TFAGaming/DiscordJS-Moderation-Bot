const { } = require('discord.js');
const { ModulesSchema } = require('../../schemas/main');
const modules = require('../../index').modules;

module.exports = {
    name: 'module',
    description: 'Enable/Disable a module.',
    type: 1,
    options: [
        {
            name: 'enable',
            description: 'Enable a module.',
            type: 1,
            options: [
                {
                    name: 'module',
                    description: 'The module to enable.',
                    type: 3,
                    choices: modules.map((module) => {
                        return {
                            name: module,
                            value: module
                        }
                    }),
                    required: true
                }
            ]
        },
        {
            name: 'disable',
            description: 'Disable a module.',
            type: 1,
            options: [
                {
                    name: 'module',
                    description: 'The module to disable.',
                    type: 3,
                    choices: modules.map((module) => {
                        return {
                            name: module,
                            value: module
                        }
                    }),
                    required: true
                }
            ]
        }
    ],
    role_perms: null,
    developers_only: true,
    category: 'Developers',
    run: async (client, interaction, config) => {
        const subCommandInput = interaction.options._subcommand;
        const moduleInput = interaction.options.get('module').value;

        await interaction.reply({
            content: `\`•••\` Please wait...`,
            ephemeral: true
        });

        if (['Developers', 'Administration'].some((m) => m === moduleInput)) return interaction.editReply({
            content: 'Woah stop right there, you cannot disable this module because you can\'t turn it on later!',
            ephemeral: true
        })

        if (subCommandInput === 'enable') {
            ModulesSchema.findOne({
                guild: interaction.guild.id
            }, async (err, data) => {
                if (err) throw err;

                if (data) {
                    if (!data.modules.includes(moduleInput)) return interaction.editReply({
                        content: `\`❌\` This module (${moduleInput}) is already enabled.`,
                        ephemeral: true
                    });

                    await ModulesSchema.updateOne({
                        guild: interaction.guild.id
                    }, {
                        $pull: {
                            modules: moduleInput
                        }
                    });

                    if (!data?.modules?.length) {
                        await ModulesSchema.deleteOne({
                            guild: interaction.guild.id
                        });
                    };

                    return interaction.editReply({
                        content: `\`✅\` Module has been enabled: **${moduleInput}**`,
                        ephemeral: true
                    });
                } else {
                    return interaction.editReply({
                        content: `\`⚠️\` [**DATABASE_NOT_READY**]: Please try to disable a module firstly to create a database for the disabled modules.`,
                        ephemeral: true
                    });
                };
            });
        };

        if (subCommandInput === 'disable') {
            ModulesSchema.findOne({
                guild: interaction.guild.id
            }, async (err, data) => {
                if (err) throw err;

                if (data) {
                    if (data.modules.includes(moduleInput)) return interaction.editReply({
                        content: `\`❌\` This module (${moduleInput}) is already disabled.`,
                        ephemeral: true
                    });

                    await ModulesSchema.updateOne({
                        guild: interaction.guild.id
                    }, {
                        $push: {
                            modules: moduleInput
                        }
                    });

                    return interaction.editReply({
                        content: `\`✅\` Module has been disabled: **${moduleInput}**`,
                        ephemeral: true
                    });
                } else {
                    data = new ModulesSchema({
                        guild: interaction.guild.id,
                        modules: [moduleInput]
                    });

                    data.save();

                    return interaction.editReply({
                        content: `\`✅\` Module has been disabled: **${moduleInput}**`,
                        ephemeral: true
                    });
                };
            });
        };

    }
};