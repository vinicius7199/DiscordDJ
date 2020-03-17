const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
  name: "ping",
  async execute(message) {
    try {
        message.delete().catch(O_o => { });
        const ms = await message.channel.send("Calculando").then(m => m.delete(1000));
        let pEmbed = new Discord.RichEmbed()
            .setTitle("Ping")
            .setThumbnail(URL = 'https://images-ext-1.discordapp.net/external/C9swIZtREziCU7Oc_ndPu92zMZC3fNgrUEIuENB-oNs/%3Fwidth%3D499%26height%3D499/https/media.discordapp.net/attachments/500811624219934720/510972559068495882/stopwatch_1.png')
            .addField(`A latência do bot é **${ms.createdTimestamp - message.createdTimestamp}**ms.`, `A latência da API é **${Math.round(clientping)}**ms.`)
            .setColor("#0x0099ff")
            .setFooter('ViniciusDJ')
            .setTimestamp()
        message.channel.send(pEmbed)
        .then(m => {
            m.react("682047276771967008");
        });
    }catch(error)
    {
    console.log(error)
    }
}
}
    
