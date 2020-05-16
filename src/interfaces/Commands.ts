export interface Command {
    name: string;
    aliases?: Array<string>;
    usage?: string,
    cooldown?: number,
    description: string;
    execute: Function;
};

export interface Commands {
    [commandName:string]: Command;
};
