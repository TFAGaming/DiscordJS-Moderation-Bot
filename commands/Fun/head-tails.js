const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'head-tails',
    description: 'Your chance is going to be shown here!',
    type: 1,
    options: [],
    role_perms: null,
    developers_only: false,
    owner_only: false,
    category: 'Fun',
    run: async (client, interaction, config) => {

        await interaction.reply({
            content: `\`•••\` Flipping...`
        });

        const arr = ["Head", "Tail"];

        const result = arr[Math.floor(Math.random() * arr.length)];

        setTimeout(() => {
            return interaction.editReply({
                content: null,
                embeds: [
                    new EmbedBuilder()
                        .setTitle('Head or tails?')
                        .setDescription(`🪙 The result is... **${result}**!`)
                        .setColor('Blurple')
                ]
            });
        }, 3500); 

    }
};
