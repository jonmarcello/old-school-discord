import fs from "fs";

export interface Templates {
    [commandName:string]: string;
};

const templates:Templates = {};

const templateFiles = fs.readdirSync('./src/templates').filter(file => file.endsWith('.html'));

// Load all command files into memory
for (const filename of templateFiles) {
    const filePath = `./src/templates/${filename}`;

	fs.readFile(filePath, function(err, html) {
        if(err) {
            console.warn('failed to load', filePath);
            return;
        };

        templates[filename.split('.').slice(0, -1).join('.')] = html.toString();
    });
}

export default templates;
