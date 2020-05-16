import Discord from 'discord.js';
import templates from '../templates';
const nodeHtmlToImage = require('node-html-to-image');

module.exports = {
	name: 'create',
	aliases: ['c'],
	description: 'Create your account',
	execute(message:Discord.Message, /* args */) {
        nodeHtmlToImage({ html: templates['welcome'], transparent: true }).then(function(image:any) {
            const attachment = new Discord.MessageAttachment(image, 'welcome-image.png');

            message.channel.send('', attachment);
        }).catch(function(err:any) {
            console.error('Failed to convert template', err);
        });
	},
}