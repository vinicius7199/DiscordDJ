const Discord = require('discord.js');

module.exports = {
    name: 'help',
	description: 'Tocando agora',
	execute(message) {
    let comandoss = new Discord.RichEmbed()
        .setTitle("Comandos",true)
        .addField("!!play", "Tocar uma música", true)
        .addField("!!tocando", "Música tocando atualmente", true)
//        .addField("!!skip", "Pular a música atual", true)
        .addField("!!stop", "Tirar o DJ", true)
//        .addField("!!queue", "Playlist das músicas", true)
        .setColor("#005b5f")
        .setFooter('DJ Vinicius')
        .setTimestamp()
    message.channel.send(comandoss)
    }
}