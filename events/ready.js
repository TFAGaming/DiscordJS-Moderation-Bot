const client = require('../index');
const { AFKSchema } = require('../schemas/main');

client.once('ready', async () => {
    console.log('> Logged in as ' + client.user.username + '.');
});