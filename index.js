const { Client, Collection } = require('discord.js');
const { betterConsole, Colors } = require('discord.js-v14-helper');
const fs = require('fs');
const config = require('./config/main');

const client = new Client(config.client.constructor);

client.commands = new Collection();
client.modules = fs.readdirSync('./commands');

module.exports = client;

console.log(betterConsole(`
████████╗░░░███████╗░░░░█████╗░
╚══██╔══╝░░░██╔════╝░░░██╔══██╗
░░░██║░░░░░░█████╗░░░░░███████║
░░░██║░░░░░░██╔══╝░░░░░██╔══██║
░░░██║░░░██╗██║░░░░░██╗██║░░██║
░░░╚═╝░░░╚═╝╚═╝░░░░░╚═╝╚═╝░░╚═╝`, { color: Colors.BLUE }))
console.log(betterConsole('Thanks for using my project! <3\n - From: T.F.A#7524', { color: Colors.BLUE }))

fs.readdirSync('./handlers').forEach((handler) => {
    require('./handlers/' + handler)(client, config);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('[antiCrash] :: [unhandledRejection]');
    console.log(promise, reason);
});

process.on("uncaughtException", (err, origin) => {
    console.error('[antiCrash] :: [uncaughtException]');
    console.log(err, origin);
});

process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.error('[antiCrash] :: [uncaughtExceptionMonitor]');
    console.log(err, origin);
});

client.login(config.client.token);
