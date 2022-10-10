const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const {color} = require('../../config.json')

module.exports = 
{
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song.')
        .addStringOption(option =>
            option.setName("query")
                .setDescription('The url/query search of the song(s).')
                .setRequired(true)
            ),

    async execute(interaction)
    {
        if(interaction.member.voice.channel)
        {
            await interaction.deferReply();

            interaction.client.distube.options.searchSongs = 5;
            
            const query = interaction.options.getString("query");
            //const messageId = interaction.channel.lastMessageId;
            const message = await interaction.channel.messages.fetch({limit: 1, cache: false});

            await interaction.client.distube.play(interaction.member.voice.channel, query, {member: interaction.member, textChannel: interaction.channel, message: message.at(0)});

            await interaction.deleteReply();
        }
        else
        {
            const embed = new EmbedBuilder()
                .setColor(color)
                .setDescription('You must be in a voicechat to use this command.');

            await interaction.reply({ embeds: [embed], ephemeral: true }).catch(console.error);
        }
    },
};