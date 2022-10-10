const { EmbedBuilder } = require("discord.js")

module.exports = 
{
	name: 'searchNoResult',
	async execute(message, query)
    { 
        const embed = new EmbedBuilder()
            .setColor(color)
            .setDescription(`No result found for \`${query}\``);
        await distubeChannel.send({ embeds: [embed] }).catch(console.error);
	},
}