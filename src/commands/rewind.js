const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const {color} = require('../../config.json')

module.exports = 
{
    data: new SlashCommandBuilder()
        .setName('rewind')
        .setDescription('Rewinds the song.')
        .addStringOption(option =>
            option.setName("time")
                .setDescription('The amount of time to rewind the song by. Format: HH:MM:SS.')
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

            if(queue.currentTime - seconds < 0)
            {
                interaction.client.distube.seek(interaction.channel, 0);
                const embed = new EmbedBuilder()
                    .setColor(color)
                    .setDescription(`Time set to \`${queue.formattedCurrentTime}\` for [${queue.songs[0].name}](${queue.songs[0].url})`);

                    await interaction.reply({ embeds: [embed]}).catch(console.error);
                    setTimeout(() => interaction.deleteReply().catch(console.error), 10000);
                return;
            }

            interaction.client.distube.seek(interaction.channel, queue.currentTime - s);
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