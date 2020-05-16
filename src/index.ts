import * as Discord from 'discord.js';
import * as config from "./config/config.json";
import commands from './commands/index';
import { findCommandAlias } from './utils';

require('./templates/index.ts');

const client = new Discord.Client();
const cooldowns:Discord.Collection<string, Discord.Collection<any, any>> = new Discord.Collection();

client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).split(/ +/);
    const shiftedArgs = args.shift();

    if(!shiftedArgs) return;
    const commandName = shiftedArgs.toLowerCase();

    const command = commands[commandName] || findCommandAlias(commands, commandName);

    if(!command) {
        return message.reply('command not found.')
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if(timestamps) {
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
})

client.login(config.token);
