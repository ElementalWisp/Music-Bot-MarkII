module.exports = 
{
	name: 'finishSong',
	async execute(queue, song)
    { 
        if(sentMessage != 0)
        {
            const message = await queue.textChannel.messages.fetch(sentMessage.id).catch(error =>
                {
                    if(error.code !== 10008)
                    {
                        console.error('Failed to fetch the message:', error)
                    }
                })
    
            if(message)
            {
                message.delete().catch(error =>
                    {
                        if(error.code !== 10008)
                        {
                            console.error('Failed to delete the message:', error)
                        }
                    })
            }
        }
	},
}