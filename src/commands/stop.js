const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const {color} = require('../../config.json')

module.exports = 
{
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop the music.'),

    async execute(interaction)
    {
        const queue = await interaction.client.distube.getQueue(interaction.channel);
        if(queue && interaction.member.voice.channel && interaction.client.voice.adapters.size > 0) 
        {
            await interaction.deferReply();

            await interaction.client.distube.stop(interaction);

            await interaction.deleteReply();
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