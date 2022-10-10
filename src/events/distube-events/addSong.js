const { EmbedBuilder } = require("discord.js");
const {color} = require("../../../config.json")

module.exports = 
{
	name: 'addSong',
	async execute(queue, song)
    { 
        const position = queue.songs.length;

        if(position > 1)
        {
            if(song.formattedDuration === "00:00")
            {
                const embed = new EmbedBuilder()
                    .setColor(color)
                    .setFields({name: `Track Queue - Position ${position}`, value: `[${song.name}](${song.url})`});
                queue.textChannel.send({embeds: [embed]}).catch(console.error); 
            }
            else
            {
                const embed = new EmbedBuilder()
                    .setColor(color)
                    .setFields({name: `Track Queue - Position ${position}`, value: `[${song.name}](${song.url}) - \`${song.formattedDuration}\``});
                queue.textChannel.send({embeds: [embed]}).catch(console.error);   
            }
  
        }
	},
}