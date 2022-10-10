const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const {color} = require('../../config.json')

module.exports = 
{
    data: new SlashCommandBuilder()
        .setName('seek')
        .setDescription('Go to a time in the video.')
        .addStringOption(option =>
            option.setName("time")
                .setDescription('Enter a time to seek to. Format: HH:MM:SS.')
                .setRequired(true)
            ),

    async execute(interaction)
    {
        const queue = await interaction.client.distube.getQueue(interaction.channel);

        if(queue && interaction.member.voice.channel && interaction.client.voice.adapters.size > 0)
        {
            const time = await interaction.options.getString("time");

            const timeSplit = time.split(":");
            for (let i = 0; i < timeSplit.length; i++)
            {
                let numberCheck = parseInt(timeSplit[i]);
                if(isNaN(numberCheck) || numberCheck < 0)
                {
                    const embed = new EmbedBuilder()
                        .setColor(color)
                        .setDescription(`Time has to be in \`HH:MM:SS\` | \`MM:SS\` | \`SS\` format.`);

                    await interaction.reply({ embeds: [embed], ephemeral: true }).catch(console.error);

                    return;
                }
            }
            
            let seconds = 0;
            let m = 1;

            while(timeSplit.length > 0)
            {
                seconds += m * parseInt(timeSplit.pop(), 10);
                m *= 60;
            }
            
            const songDuration = queue.songs[0].duration;

            if(songDuration < seconds)
            {
                const embed = new EmbedBuilder()
                    .setColor(color)
                    .setDescription(`Time must be within the video duration.`);

                await interaction.reply({ embeds: [embed], ephemeral: true }).catch(console.error);

                return;
            }

            interaction.client.distube.seek(interaction.channel, seconds);

            const embed = new EmbedBuilder()
                .setColor(color)
                .setDescription(`Time set to \`${queue.formattedCurrentTime}\` for [${queue.songs[0].name}](${queue.songs[0].url})`);

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