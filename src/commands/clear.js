const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const {color} = require('../../config.json')

module.exports = 
{
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clear the queue.'),

    async execute(interaction)
    {
        const queue = await interaction.client.distube.getQueue(interaction.channel);
        if(queue && interaction.member.voice.channel && interaction.client.voice.adapters.size > 0) 
        {
            await queue.songs.splice(1);
            const embed = new EmbedBuilder()
                .setColor(color)
                .setDescription(`Cleared the queue.`)

            await interaction.reply({ embeds: [embed]}).catch(console.error);
            setTimeout(() => interaction.deleteReply().catch(console.error), 10000);
        } 
        else if(queue && !interaction.member.voice.channel)
        {
            const embed = new EmbedBuilder()
                .setColor(color)
                .setDescription('You must be in a voicechat to use this command.');

            await interaction.reply({ embeds: [embed], ephemeral: true }).catch(console.error);
        }
        else
        {
            const embed = new EmbedBuilder()
                .setColor(color)
                .setDescription('There is no song playing.');

            await interaction.reply({ embeds: [embed], ephemeral: true }).catch(console.error); 
        }
    },
};