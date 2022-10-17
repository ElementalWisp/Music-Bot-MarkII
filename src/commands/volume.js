const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const {color} = require('../../config.json')

module.exports = 
{
    data: new SlashCommandBuilder()
        .setName('volume')
        .setDescription('Set the song volume. (Volume resets to 50 every time a new song is played)')
        .addIntegerOption(option =>
            option.setName("number")
                .setDescription('Enter a number between 1 and 250.')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(250)
            ),

    async execute(interaction)
    {
        const queue = await interaction.client.distube.getQueue(interaction.channel);

        if(queue && interaction.member.voice.channel && interaction.client.voice.adapters.size > 0)
        {
            await interaction.client.distube.setVolume(interaction.channel, interaction.options.getInteger("number"));

            const embed = new EmbedBuilder()
                .setColor(color)
                .setDescription(`Volume set to \`${interaction.options.getInteger("number")}%\` for [${queue.songs[0].name}](${queue.songs[0].url})`);

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