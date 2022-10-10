const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const {color} = require('../../config.json')

module.exports = 
{
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('Removes specified ')
        .addIntegerOption(option =>
            option.setName("position")
                .setDescription('The number position of the song in the queue.')
                .setRequired(true)
            ),

    async execute(interaction)
    {
        const queue = await interaction.client.distube.getQueue(interaction.channel);

        if(queue && interaction.member.voice.channel && interaction.client.voice.adapters.size > 0)
        {
            let pos = parseInt(interaction.options.getInteger("position"));
            if (isNaN(pos) || pos < 2)
            {
                const embed = new EmbedBuilder()
                    .setColor(color)
                    .setDescription("Please enter a valid number greater than 1.");
                    
                await interaction.reply({ embeds: [embed], ephemeral: true }).catch(console.error);
                return;
            }

            pos -= 1;
            if(queue.songs.length > pos)
            {
                const song = await queue.songs[pos];
                await queue.songs.splice(pos, 1);

                const embed = new EmbedBuilder()
                    .setColor(color)
                    .addFields({name: "Removed", value: `${pos+1} - [${song.name}](${song.url})`});

                await interaction.reply({ embeds: [embed]}).catch(console.error);
                setTimeout(() => interaction.deleteReply().catch(console.error), 10000);
            }
            else
            {
                const embed = new EmbedBuilder()
                    .setColor(color)
                    .setDescription("Please enter a valid position in the queue greater than 1.");
                    
                await interaction.reply({ embeds: [embed], ephemeral: true }).catch(console.error);
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