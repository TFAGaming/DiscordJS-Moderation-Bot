const { EmbedBuilder } = require('discord.js');
const os = require('os');

module.exports = {
    name: 'statistics',
    description: 'Replies with bot statistics!',
    type: 1,
    options: [],
    role_perms: null,
    developers_only: false,
    category: 'Information',
    run: async (client, interaction, config) => {
        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: client.user.username,
                        iconURL: client.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTitle(client.user.username + '\'s statistics:')
                    .addFields(
                        { name: "Name", value: client.user.tag, inline: true },
                        { name: "Identification", value: `\`${client.user.id}\``, inline: true },
                        { name: "Application commands", value: `${client.commands.size} commands`, inline: true },
                        { name: "Total guilds joined", value: `${client.guilds.cache.size} servers`, inline: true },
                        { name: 'Author', value: `${require('../../package.json').author || "Unknown#0000"}`, inline: true },
                        { name: "Language", value: "JavaScript", inline: true },
                        { name: 'Last version', value: `${require('../../package.json').version}`, inline: true },
                        { name: 'discord.js version', value: `${require('../../package.json').dependencies['discord.js'].replace('^', '')}`, inline: true },
                        { name: "Node.JS version", value: `${process.version}`, inline: true },
                        { name: "Random-access memory", value: `${(os.totalmem() / 1024 / 1024).toFixed().substr(0, 2)}GB (${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}% used)`, inline: true },
                        { name: "Central processing unit", value: `${os.cpus().map(i => `${i.model}`)[0]}`, inline: true },
                        { name: "Platform", value: `${os.platform}`, inline: true },
                    )
                    .setColor('Blurple')
            ]
        });
    }
};