const Discord = module.require("discord.js");
module.exports.run = async (bot, message, args) => {
	let embed = new Discord.RichEmbed()
		.setAuthor(message.author.username)
		.setDescription("This is my user informations!")
		.setColor("#9B59B6")
		.addField("Full Username", `${message.author.username}#${message.author.discriminator}`)
		.addField("User ID:", message.author.id)
		.addField("Joined Discord on:", message.author.createdAt)
		if (message.author.avatarURL == null) message.reply("No Avatar");
		else message.reply(message.author.avatarURL);
	message.channel.send({embed: embed});
}
module.exports.help = {
	name: "userinfo"
}
