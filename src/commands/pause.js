const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const {color} = require('../../config.json')

module.exports = 
{
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pauses/unpauses the current song.'),

    async execute(interaction)
    {
        const queue = await interaction.client.distube.getQueue(interaction.channel);

        if(queue && interaction.member.voice.channel && interaction.client.voice.adapters.size > 0 && !queue.paused)
        {
            await interaction.client.distube.pause(interaction.channel);

            const embed = new EmbedBuilder()
                .setColor(color)
                .setDescription(`Paused [${queue.songs[0].name}](${queue.songs[0].url})`);

            await interaction.reply({ embeds: [embed]}).catch(console.error);
        }
        else if(queue && interaction.member.voice.channel && interaction.client.voice.adapters.size > 0 && queue.paused)
        {
            await interaction.client.distube.pause(interaction.channel);

            const embed = new EmbedBuilder()
                .setColor(color)
                .setDescription(`Unpaused [${queue.songs[0].name}](${queue.songs[0].url})`);

            await interaction.reply({ embeds: [embed]}).catch(console.error);
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