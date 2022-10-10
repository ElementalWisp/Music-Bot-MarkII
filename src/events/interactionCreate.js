module.exports = 
{
	name: 'interactionCreate',
	async execute(interaction) 
    {
        if (interaction.isChatInputCommand())
        {
            const command = interaction.client.commands.get(interaction.commandName);
    
            if (!command) return;
        
            try 
            {
                await command.execute(interaction);
            } 
            catch (error) 
            {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
        else if(interaction.isButton())
        {
            if(interaction.customId === "option1")
            {
                if(!resultMessage)
                {
                    return;
                }

                const message = await interaction.channel.messages.fetch(resultMessage.id).catch(error =>
                    {
                        if(error.code !== 10008)
                        {
                            console.error('Failed to fetch the message:', error)
                        }
                    });

                const string = await resultMessage.embeds[0].fields[0].value;

                let matches = string.match(/\bhttps?:\/\/\S+/gi);
                for(let i = 0; i < matches.length; i++)
                {
                    matches[i] = matches[i].slice(0, -1);
                }

                if(message)
                {
                    if(await interaction.member.voice.channel)
                    {
                        await interaction.client.distube.play(interaction.member.voice.channel, matches[0], {member: interaction.member, textChannel: interaction.channel, message});
                    }

                    message.delete().catch(error =>
                        {
                            if(error.code !== 10008)
                            {
                                console.error('Failed to delete the message:', error)
                            }
                        })
                }
            }
            else if(interaction.customId ==="option2")
            {
                if(!resultMessage)
                {
                    return;
                }

                const message = await interaction.channel.messages.fetch(resultMessage.id).catch(error =>
                    {
                        if(error.code !== 10008)
                        {
                            console.error('Failed to fetch the message:', error)
                        }
                    });

                const string = await resultMessage.embeds[0].fields[0].value;

                let matches = string.match(/\bhttps?:\/\/\S+/gi);
                for(let i = 0; i < matches.length; i++)
                {
                    matches[i] = matches[i].slice(0, -1);
                }

                if(message)
                {
                    if(await interaction.member.voice.channel)
                    {
                        await interaction.client.distube.play(interaction.member.voice.channel, matches[1], {member: interaction.member, textChannel: interaction.channel, message});
                    }

                    message.delete().catch(error =>
                        {
                            if(error.code !== 10008)
                            {
                                console.error('Failed to delete the message:', error)
                            }
                        })
                }
            }
            else if(interaction.customId ==="option3")
            {
                if(!resultMessage)
                {
                    return;
                }

                const message = await interaction.channel.messages.fetch(resultMessage.id).catch(error =>
                    {
                        if(error.code !== 10008)
                        {
                            console.error('Failed to fetch the message:', error)
                        }
                    });

                const string = await resultMessage.embeds[0].fields[0].value;

                let matches = string.match(/\bhttps?:\/\/\S+/gi);
                for(let i = 0; i < matches.length; i++)
                {
                    matches[i] = matches[i].slice(0, -1);
                }

                if(message)
                {
                    if(await interaction.member.voice.channel)
                    {
                        await interaction.client.distube.play(interaction.member.voice.channel, matches[2], {member: interaction.member, textChannel: interaction.channel, message});
                    }

                    message.delete().catch(error =>
                        {
                            if(error.code !== 10008)
                            {
                                console.error('Failed to delete the message:', error)
                            }
                        })
                }
            }
            else if(interaction.customId ==="option4")
            {
                if(!resultMessage)
                {
                    return;
                }

                const message = await interaction.channel.messages.fetch(resultMessage.id).catch(error =>
                    {
                        if(error.code !== 10008)
                        {
                            console.error('Failed to fetch the message:', error)
                        }
                    });

                const string = await resultMessage.embeds[0].fields[0].value;

                let matches = string.match(/\bhttps?:\/\/\S+/gi);
                for(let i = 0; i < matches.length; i++)
                {
                    matches[i] = matches[i].slice(0, -1);
                }

                if(message)
                {
                    if(await interaction.member.voice.channel)
                    {
                        await interaction.client.distube.play(interaction.member.voice.channel, matches[3], {member: interaction.member, textChannel: interaction.channel, message});
                    }

                    message.delete().catch(error =>
                        {
                            if(error.code !== 10008)
                            {
                                console.error('Failed to delete the message:', error)
                            }
                        })
                }
            }
            else if(interaction.customId ==="option5")
            {
                if(!resultMessage)
                {
                    return;
                }

                const message = await interaction.channel.messages.fetch(resultMessage.id).catch(error =>
                    {
                        if(error.code !== 10008)
                        {
                            console.error('Failed to fetch the message:', error)
                        }
                    });

                const string = await resultMessage.embeds[0].fields[0].value;

                let matches = string.match(/\bhttps?:\/\/\S+/gi);
                for(let i = 0; i < matches.length; i++)
                {
                    matches[i] = matches[i].slice(0, -1);
                }

                if(message)
                {
                    if(await interaction.member.voice.channel)
                    {
                        await interaction.client.distube.play(interaction.member.voice.channel, matches[4], {member: interaction.member, textChannel: interaction.channel, message});
                    }

                    message.delete().catch(error =>
                        {
                            if(error.code !== 10008)
                            {
                                console.error('Failed to delete the message:', error)
                            }
                        })
                }
            }
        }
        else
        {
            return;
        }
	},
};