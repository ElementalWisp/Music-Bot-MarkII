const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const {color} = require('../../config.json')

module.exports = 
{
    data: new SlashCommandBuilder()
        .setName('effect')
        .setDescription('Adds an effect to the current song.')
        .addStringOption(option =>
            option.setName("selections")
                .setDescription('Please choose the effect to apply/disable.')
                .setRequired(true)
                .addChoices(
                    { name: 'Bassboost', value: 'bassboost' },
                    { name: 'Echo', value: 'echo' },
                    { name: 'Karaoke', value: 'karaoke' },
                    { name: 'Nightcore', value: 'nightcore' },
                    { name: 'Vaporwave', value: 'vaporwave' },
                    { name: '3D', value: '3d' },
                    { name: 'Remove All Effects', value: 'remove' },
                )
            ),

            async execute(interaction)
            {
                const queue = await interaction.client.distube.getQueue(interaction.channel);
        
                if(queue && interaction.member.voice.channel && interaction.client.voice.adapters.size > 0 && queue.songs.length > 1)
                {
                    let filter = '';

                    if(interaction.options.getString("selections") === "remove")
                    {
                        filter = interaction.client.distube.setFilter(interaction.channel, false);
                    }
                    else
                    {
                        filter = interaction.client.distube.setFilter(interaction.channel, interaction.options.getString("selections"));
                    }

                    const embed = new EmbedBuilder()
                        .setColor(color)
                        .setDescription(`Current queue filter: \`${filter.join(', ') || 'Off'}\``);

                    await interaction.reply({ embeds: [embed] });
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