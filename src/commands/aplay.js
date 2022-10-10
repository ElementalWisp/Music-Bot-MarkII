const {SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const {color} = require('../../config.json')

const mediaTypes = ["audio/mpeg", "audio/mp3", "audio/midi", "video/mp4", "audio/x-wav", "video/webm", "video/quicktime", "video/x-flv"]

module.exports = 
{
    data: new SlashCommandBuilder()
        .setName('aplay')
        .setDescription('Play a song using an attachment.')
        .addAttachmentOption(option =>
            option.setName("attachment")
                .setDescription("Upload an attachment.")
                .setRequired(true)
            ),

    async execute(interaction)
    {
        if(interaction.member.voice.channel)
        {
            const attachment = interaction.options.getAttachment("attachment");

            if(mediaTypes.includes(attachment.contentType))
            {
                await interaction.deferReply();
                const message = await interaction.channel.messages.fetch({limit: 1, cache: false});

                await interaction.client.distube.play(interaction.member.voice.channel, attachment.proxyURL, {member: interaction.member, textChannel: interaction.channel, message: message.at(0)});
                await interaction.deleteReply();
            }
            else
            {
                if(attachment.contentType)
                {
                    const extension = await attachment.contentType
                    const embed = new EmbedBuilder()
                        .setColor(color)
                        .setDescription(`Unknown extension/file type: ${extension}`)
    
                    await interaction.reply({ embeds: [embed], ephemeral: true }).catch(console.error);
                }
                else
                {
                    const embed = new EmbedBuilder()
                        .setColor(color)
                        .setDescription(`Unknown extension/file type`)
    
                    await interaction.reply({ embeds: [embed], ephemeral: true }).catch(console.error);
                }
            }
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