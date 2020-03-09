const Discord = require('discord.js');
module.exports = {
       name: "shutdown",
    async execute(message) {
        message.delete().catch(O_o => { });
        const ownerID = '194223537228218368';

        if(message.author.id !== ownerID) return message.reply("Apenas o meu dono pode fazer isso =D");

        try{
            await message.channel.send("Estou indo dormir.")
            process.exit()
        } catch(error) {
            message.channel.send(`Não consigo dormir... ${error.message}` )
        }

    }
}