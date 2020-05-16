import { Command, Commands } from '../interfaces/Commands';
import fs from "fs";

const commands:Commands = {};

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.ts') && !file.includes('index'));

function setCommand(command: Command) {
    commands[command.name] = command;
}

// Load all command files into memory
for (const file of commandFiles) {
	const command = require(`./${file}`);
	setCommand(command);
}

export default commands;
