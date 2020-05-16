import Discord from 'discord.js';

module.exports = {
	name: 'ping',
	aliases: ['p'],
	description: 'Ping!',
	execute(message:Discord.Message, /* args */) {
		message.channel.send('Pong.');
	},
}