const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const {color} = require('../../config.json')

module.exports = 
{
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Shuffles the queue.'),

    async execute(interaction)
    {
        const queue = await interaction.client.distube.getQueue(interaction.channel);

        if(queue && interaction.member.voice.channel && interaction.client.voice.adapters.size > 0 && queue.songs.length > 1)
        {
            await interaction.client.distube.shuffle(interaction.channel);

            const embed = new EmbedBuilder()
                .setColor(color)
                .setDescription(`<@${message.member.id}> shuffled the queue`);

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
        else if(queue && interaction.member.voice.channel && interaction.client.voice.adapters.size > 0 && queue.songs.length === 1)
        {
            const embed = new EmbedBuilder()
                .setColor(color)
                .setDescription('There is only one song in the queue so there is nothing to shuffle.');

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