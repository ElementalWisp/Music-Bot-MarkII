const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const {color} = require('../../config.json')

module.exports = 
{
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip a song.'),

    async execute(interaction)
    {
        const queue = await interaction.client.distube.getQueue(interaction.channel);

        if(queue && interaction.member.voice.channel && interaction.client.voice.adapters.size > 0 && queue.songs.length > 1)
        {
            const embed = new EmbedBuilder()
                .setColor(color)
                .setDescription(`<@${interaction.member.id}> skipped [${queue.songs[0].name}](${queue.songs[0].url})`);
            await interaction.reply({ embeds: [embed] });
            setTimeout(() => interaction.deleteReply().catch(console.error), 10000);

            await interaction.client.distube.skip(interaction.channel);
        }
        else if(queue && interaction.member.voice.channel && interaction.client.voice.adapters.size > 0 && queue.songs.length === 1)
        {
            const embed = new EmbedBuilder()
                .setColor(color)
                .setDescription(`<@${interaction.member.id}> skipped [${queue.songs[0].name}](${queue.songs[0].url})`);
            await interaction.reply({ embeds: [embed] });
            setTimeout(() => interaction.deleteReply().catch(console.error), 10000);

            interaction.client.distube.options.leaveOnStop = false;
            await interaction.client.distube.stop(interaction.channel);
            interaction.client.distube.options.leaveOnStop = true;

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