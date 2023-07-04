require( 'dotenv' ).config();

const Server = require( './models/server' );

const server = new Server();
 
server.listen();

const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.on('ready', ( c ) => {
    console.log(`✔ ${ c.user.tag } is online!`);
})

client.on('interactionCreate', ( interaction ) => {
    if ( !interaction.isChatInputCommand() ) return;

    if (interaction.commandName === 'addtask') {
        const taskName = interaction.options.get('task').value;
        const { guildId, user: { id: userId, username }} = interaction;
        console.log(guildId,
            userId,
            username);
        interaction.reply(`Holabuenas, ya le agrego la tarea "${taskName}"`);
    };
})

client.login(process.env.BOT_TOKEN)