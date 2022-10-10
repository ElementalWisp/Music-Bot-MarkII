const { EmbedBuilder } = require("discord.js");
const {color} = require("../../../config.json")

module.exports = 
{
	name: 'error',
	async execute(channel, e)
    { 
        console.error(e);

        const embed = new EmbedBuilder()
            .setColor(color)
            .setDescription("Was not able to play - please try again or try another video/link.");
        
        channel.send({embeds: [embed]});
	},
}