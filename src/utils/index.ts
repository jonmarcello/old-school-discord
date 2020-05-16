import { Command, Commands } from '../interfaces/Commands';

export function findCommandAlias(commands: Commands, find: string):(Command | undefined) {
    const commandKeys = Object.keys(commands);
    for(const key of commandKeys) {
        if(commands[key].aliases?.includes(find)) {
            return commands[key];
        }
    }

    return;
}