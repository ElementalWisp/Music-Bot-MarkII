const { EmbedBuilder } = require("discord.js");
const {color} = require("../../../config.json")

module.exports = 
{
	name: 'playSong',
	async execute(queue, song)
    { 
        if(sentMessage != 0)
        {
            const message = await queue.textChannel.messages.fetch(sentMessage.id).catch(error =>
                {
                    if(error.code !== 10008)
                    {
                        console.error('Failed to fetch the message:', error)
                    }
                });

            if(message)
            {
                message.delete().catch(error =>
                    {
                        if(error.code !== 10008)
                        {
                            console.error('Failed to delete the message:', error)
                        }
                    });
            }
        }

        if(song.formattedDuration === "00:00")
        {
            if(song.thumbnail)
            {
                const embed = new EmbedBuilder()
                    .setColor(color)
                    .setFields({name: "Now Playing", value: `[${song.name}](${song.url})`})
                    .setFooter({text: `Requested by ${song.member.displayName}`})
                    .setThumbnail(song.thumbnail);

                sentMessage = await queue.textChannel.send({ embeds: [embed] }).catch(console.error);
            }
            else
            {
                const embed = new EmbedBuilder()
                    .setColor(color)
                    .setFields({name: "Now Playing", value: `[${song.name}](${song.url})`})
                    .setFooter({text: `Requested by ${song.member.displayName}`})

                sentMessage = await queue.textChannel.send({ embeds: [embed] }).catch(console.error);
            }
        }
        else
        {
            if(song.thumbnail)
            {
                const embed = new EmbedBuilder()
                    .setColor(color)
                    .setFields({name: "Now Playing", value: `[${song.name}](${song.url}) - \`${song.formattedDuration}\``})
                    .setFooter({text: `Requested by ${song.member.displayName}`})
                    .setThumbnail(song.thumbnail);

                sentMessage = await queue.textChannel.send({ embeds: [embed] }).catch(console.error);
            }
            else
            {
                const embed = new EmbedBuilder()
                    .setColor(color)
                    .setFields({name: "Now Playing", value: `[${song.name}](${song.url}) - \`${song.formattedDuration}\``})
                    .setFooter({text: `Requested by ${song.member.displayName}`})

                sentMessage = await queue.textChannel.send({ embeds: [embed] }).catch(console.error);
            }
        }
	},
}