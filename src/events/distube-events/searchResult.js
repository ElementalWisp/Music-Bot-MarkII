const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
const {color, icon} = require("../../../config.json")

module.exports = 
{
	name: 'searchResult',
	async execute(message, results, query)
    { 
        let i = 0;
		const one = '1️⃣';
		const two = '2️⃣';
		const three = '3️⃣';
		const four = '4️⃣';
		const five = '5️⃣';
		const six = '6️⃣';
		let emojis = [one,two,three,four,five,six];
        
        const embed = new EmbedBuilder()
            .setColor(color)
            .setFooter({text:`Query: ${query}`})
			.setAuthor({name: 'Select a result to play', iconURL: `${icon}`})
            .setFields({ name: 'Songs', value: `\n${results.map(song => `${emojis[i++]} [${song.name}](${song.url}) - \`${song.formattedDuration}\``).join("\n\n")}\n\n*Select a button corresponding to the song*`});

        const buttonOne = new ButtonBuilder()
            .setCustomId("option1")
            .setStyle(ButtonStyle.Primary)
            .setEmoji(one)
            .setDisabled(false);

        const buttonTwo = new ButtonBuilder()
            .setCustomId("option2")
            .setStyle(ButtonStyle.Primary)
            .setEmoji(two)
            .setDisabled(false);

        const buttonThree = new ButtonBuilder()
            .setCustomId("option3")
            .setStyle(ButtonStyle.Primary)
            .setEmoji(three)
            .setDisabled(false);

        const buttonFour = new ButtonBuilder()
            .setCustomId("option4")
            .setStyle(ButtonStyle.Primary)
            .setEmoji(four)
            .setDisabled(false);

        const buttonFive = new ButtonBuilder()
            .setCustomId("option5")
            .setStyle(ButtonStyle.Primary)
            .setEmoji(five)
            .setDisabled(false);

        const buttonArray = [buttonOne, buttonTwo, buttonThree, buttonFour, buttonFive];

        const resultsLength = results.length;

        if(resultsLength === 4)
        {
            buttonFive.setDisabled = true;
        }
        else if(resultsLength === 3)
        {
            buttonFive.setDisabled = true;
            buttonFour.setDisabled = true;
        }
        else if(resultsLength === 2)
        {
            buttonFive.setDisabled = true;
            buttonFour.setDisabled = true;
            buttonThree.setDisabled = true;
        }
        else if(resultsLength === 1)
        {
            buttonFive.setDisabled = true;
            buttonFour.setDisabled = true;
            buttonThree.setDisabled = true;
            buttonTwo.setDisabled = true;
        }

        const row = new ActionRowBuilder()
            .addComponents
            (
                buttonArray
            );

        resultMessage = await message.channel.send({embeds: [embed], components: [row]}).catch(error =>
            {
                if(error.code !== 10008)
                {
                    console.error('Failed to send the message:', error)
                }
            });

        setTimeout(() => resultMessage.delete().catch(error =>
            {
                if(error.code !== 10008)
                {
                    console.error('Failed to delete to the message:', error)
                }
            }), 30000)
	},
}