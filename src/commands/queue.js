const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const {color} = require('../../config.json')
const {Pagination} = require("discordjs-button-embed-pagination");

module.exports = 
{
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Displays the song queue.'),

    async execute(interaction)
    {
        const queue = await interaction.client.distube.getQueue(interaction.channel);

        if(queue && interaction.member.voice.channel && interaction.client.voice.adapters.size > 0)
        {
            await interaction.deferReply();

            let  embedArray = [];
            let k = 10;
            for(let i = 0; i < queue.songs.length; i+= 10)
            {
                const current = queue.songs.slice(i, k);
                let j = i;
                k += 10;
                const info = current.map(song => `**${++j}**. [${song.name}](${song.url})`).join('\n');
                const embed = new EmbedBuilder()
                    .setColor(color)
                    .setDescription(`**[Current Song: ${queue.songs[0].name}](${queue.songs[0].url})**\n${info}`);
                embedArray.push(embed);
            }


                await new Pagination
                (
                    interaction.channel, //textChannel
                    embedArray, //EmbedBuilder[]
                    "Page", //Page name
                    40000, //Timeout
                ).paginate().catch(error =>
                    {
                        if(error.code !== 10008)
                        {
                            console.error('Failed to paginate.', error)
                        }
                    });
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
                .setDescription('There is nothing in the queue.');

            await interaction.reply({ embeds: [embed], ephemeral: true }).catch(console.error); 
        }
    },
};