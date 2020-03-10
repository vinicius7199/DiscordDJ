const discord = require('discord.js');
const client = new discord.Client();
const config = require('../config.json');
const ytdl = require("ytdl-core");
const search = require('youtube-search');
const opts = {
    maxResults: 5,
    key: config.YOUTUBE_API,
    type: 'video'
};

playlist = [];

module.exports
try {

    client.on('ready', () => console.log("Online!"));
    client.on('message', async message => {
        if (message.author.bot) return;
        if (message.content.toLowerCase() === '!!play') {

            const voiceChannel = message.member.voiceChannel;
            if (voiceChannel) {
                let join = message.member.voiceChannel.join();
            }
            if (!voiceChannel)
                return message.channel.send("**Entre em um canal de voz. Depois é só me chamar!**");
            const permissions = voiceChannel.permissionsFor(message.client.user);
            if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
                return message.channel.send("**Eu não tenho permissão pra soltar a música!**");
            }

            let embed = new discord.RichEmbed()
                .setColor("BLUE")
                .setDescription("Me diga, qual o nome da música que você quer que eu toque?")
                .setTitle("Play")
                .setThumbnail(client.user.displayAvatarURL)
                .setFooter('DJ Vinicius')
                .setTimestamp();
            let embedMsg = await message.channel.send(embed) 
            console.log("Play utilizado");
            let filter = m => m.author.id === message.author.id;
            let query = await message.channel.awaitMessages(filter, { max: 1 });
            let results = await search(query.first().content, opts).catch(err => console.log(err));
            message.delete().catch(O_o => { });
            if (results) {
                let youtubeResults = results.results;
                let i = 0;
                let titles = youtubeResults.map(result => {
                    i++;
                    return i + ". " + result.title;
                });
                message.channel.send({
                    embed: {
                        title: 'Fiquei em dúvida, qual dessas é ela?',
                        description: titles.join("\n"),
                        color: 0x0099ff
                    }
                }).catch(err => console.log(err));

                filter = m => (m.author.id === message.author.id) && m.content >= 1 && m.content <= youtubeResults.length;
                let collected = await message.channel.awaitMessages(filter, { maxMatches: 1, time:30000, errors:['time'] });
//                  let collected =  await message.channel.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
 //                 collected.on('collect', async (reaction, awaitReactions) =>
   //               {
     //               if(reaction.emoji.id === ''){ 
                        
       //             }
         //         })
                let selected = youtubeResults[collected.first().content - 1];

/*                    embed = new discord.RichEmbed()
                        .setTitle(`Estou tocando`)
                        .setColor("BLUE")
                        .setURL(`${selected.link}`)
//                       .setDescription(`${selected.description}`)
                        .setDescription(`${selected.title}`)
                        .setThumbnail(`${selected.thumbnails.default.url}`)
                        .setFooter('DJ Vinicius')
                        .setTimestamp();
*/   const Embed = {
                    color: 0x0099ff,
                    title: `Música`,
                    author: {
                        name: 'Play',
                        icon_url: 'https://cdn.discordapp.com/avatars/676839841215807536/b5acd83ed783240c80d9dd85bbf84f5d.png?size=128',
                        url: `${selected.link}`,
                    },
                    thumbnail: {
                        url: `${selected.thumbnails.default.url}`,
                    },
                    description: `${selected.title}`,
                    fields: [
                        {
                            name: `Canal:`,
                            value: `${selected.channelTitle}`,
                        },
                    ],

                    timestamp: new Date(),
                    footer: {
                        text: 'DJ Vinicius',
                        icon_url: 'https://cdn.discordapp.com/avatars/676839841215807536/b5acd83ed783240c80d9dd85bbf84f5d.png?size=128',
                    },
                };


                if (selected) {
                    let msc = message.content.replace('!!play', `${selected.link}`);
                    message.channel.send({ embed: Embed })
                    //playlist.push(`${selected.title}`)
                    msc.push(playlist[0])
                    if (ytdl.validateURL(msc)) {
                    voiceChannel.connection.playStream(ytdl(playlist));
                    }
                    if(!playlist[0])
                    {
                        console.log("Música acabou")
                        const voiceChannel = message.member.voiceChannel;
                        voiceChannel.leave();
                    }
                }
            }
        }
        if (message.content.toLowerCase() === '!!stop') {
            const voiceChannel = message.member.voiceChannel;
            playlist = [];
            voiceChannel.leave();
            if(!playlist[0]) return message.reply("Não estou tocando nada!")
            console.log("Stop Utilizado")
    }

    if (message.content.toLowerCase() === '!!tocando') {
        if(!playlist[0]){
    message.reply("Não estou tocando nada!")
}else {
            embed = new discord.RichEmbed()
            .setTitle("Tocando atualmente")
            .setColor("BLUE")
            .setDescription(playlist[0])
        message.channel.send(embed)
}
}
    })
} catch (error) {
    console.log(error)

}
client.login(config.token);