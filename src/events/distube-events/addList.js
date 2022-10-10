const { EmbedBuilder } = require("discord.js");
const {color} = require("../../../config.json");

module.exports = 
{
	name: 'addList',
	async execute(queue, playlist)
    { 
        const embed = new EmbedBuilder()
            .setColor(color)
            .setDescription(`Added [${playlist.name}](${playlist.url}) (${playlist.songs.length} songs) to the queue`);
        queue.textChannel.send({embeds: [embed]}).catch(console.error);
	},
}