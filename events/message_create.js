const client = require('../index');
const config = require('../config/main');
const { ChannelType } = require('discord.js');
const { AFKSchema } = require('../schemas/main');

// AFK System
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.channel.type === ChannelType.DM) return;

    if (!message.mentions.members.first()) {
        AFKSchema.findOne({
            user: message.author.id,
            guild: message.guild.id
        }, async (err, data) => {
            if (err) throw err;
            if (data) {
                await message.member.setNickname(message.member.user.username).catch(() => { });

                if (data.loggerType === true) {
                    return message.reply(
                        {
                            content: '**Welcome back!** I have removed your AFK.'
                        }
                    ).then(async (sent) => {
                        setTimeout(async () => {
                            await AFKSchema.deleteOne({
                                user: message.author.id,
                                guild: message.guild.id
                            });

                            return sent.delete().catch(() => { });
                        }, 8000);
                    });
                } else {
                    return message.reply(
                        {
                            content: '**Welcome back!** I have removed your AFK.'
                        }
                    ).then(async (sent) => {
                        setTimeout(async () => {
                            await AFKSchema.deleteOne({
                                user: message.author.id,
                                guild: message.guild.id
                            });

                            return sent.delete().catch(() => { });
                        }, 8000);
                    });
                };
            } else return;
        });
    } else {
        AFKSchema.findOne({
            user: message.mentions.members.first().id,
            guild: message.guild.id
        }, async (err, data) => {
            if (err) throw err;
            if (data) {
                return message.reply(`That user is currently **AFK**. ${data.reason !== null ? `Reason: ${data.reason}` : ''}`);
            } else return;
        });
    }
});