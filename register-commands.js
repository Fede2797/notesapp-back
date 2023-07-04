require( 'dotenv' ).config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'addtask',
        description: 'Adds a new task',
        options: [
            {
                name: 'task',
                description: "The name of the task",
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ]
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

( async () => {
    try {
        console.log('Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        )

        console.log("Slash commands were registered succesfully");
    } catch (error) {
        console.log(`There was an error registering the commands: ${error}`);
    }
})();