require('dotenv').config();
const token = process.env.TOKEN;

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const {ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'help',
        description: 'See the latest updates, command documentation, and other useful things'
    },
    {
        name: 'skill',
        description: 'View the skill set of any character currently in the game',
        options: [
            {
                name: "character",
                description: "Input the name of the character whos skills you wnat to see",
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    },
    {
        name: 'random-character',
        description: 'Recieve a random character from any faction',
        required: true,
        options: [
            {
                name: "faction",
                description: 'Choose the faction you want to play',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    {
                        name: "Survivor",
                        value: "survivor"
                    },
                    {
                        name: "Hunter",
                        value: "hunter"
                    },
                    {
                        name: "Both",
                        value: "both"
                    }
                ]
            }
        ]
    },
    {
        name: 'ship',
        description: 'Ship two random characters'
    },
    {
        name: 'joke',
        description: 'Idv theemed pun'
    },
    {
        name: 'coin-toss',
        description: 'Flip a coin for heads or tails'
    }
];

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(process.env.ID), // Use applicationCommands to register a global command
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
