///////////////////////////////////////////////////////////////////////////////
//HikKi's Lair - Nayuki BOT////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//Version 1.5.0 // Memes Commands finally integrated///////////////////////////
///////////////////////////////////////////////////////////////////////////////
///Main const/config///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const fs = require("fs");
const prefix = botSettings.prefix;
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
fs.readdir("./cmds/", (err, files) => {
	if(err) console.error(err);
	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if(jsfiles.length <= 0) {
		console.log("No commands to load!");
		return;
	}
	console.log(`Loading ${jsfiles.length} commands!`);
	jsfiles.forEach((f, i) => {
		let props = require(`./cmds/${f}`);
		console.log(`${i + 1}: ${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
});
var servers = {};

///////////////////////////////////////////////////////////////////////////////
///JF's command for the memes//////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

bot.on('message', message => {
    if (message.author.bot) return;
    var iKeywords = ["MARTINEZ","JEROME","PAOUNE",":^)","doit","HAHADON","STABBB","terribleluck","autismpls","shitpost","youdense","autismpls2","goodshit","jesus","fag","fu","fulol","suckitlol","martinez"]
    var iGifs = ["https://media.giphy.com/media/7597zmlZxhDGg/giphy.gif","https://media.giphy.com/media/5Zesu5VPNGJlm/giphy.gif","http://imgur.com/qDxuy6K","http://imgur.com/Z49mRUE","http://imgur.com/XhZc8im","http://imgur.com/BuEA7Fk","http://imgur.com/qnXasLA","http://imgur.com/e56uv1K","http://imgur.com/InaUwnU","http://imgur.com/PqBTALa","http://imgur.com/3KAHQZf","http://imgur.com/lYGId7H","https://media.giphy.com/media/1G7SLEIc8vy1O/giphy.gif","https://cdn.discordapp.com/attachments/240660956865101825/325218765346177027/received_10159092994780727.jpeg","https://media.giphy.com/media/xT1XGALdXN5h8F1eiA/giphy.gif","https://media.giphy.com/media/3o6gaQj6VYTJpx2atO/giphy.gif","https://media.giphy.com/media/QzqXexkCcb0Zi/giphy.gif","https://media.giphy.com/media/VVqUUvtKLrxe0/giphy.gif","https://media.giphy.com/media/ifjSDlqc70g7u/giphy.gif"]
    var messageArray = message.content.split(" ");
    var message1 = messageArray[0];
//		if (message1 === 'gifs') message.channel.send(""+iKeywords+"");
	if (message1 === '-gifs') {
		let embed = new Discord.RichEmbed()
				.setColor("#02eb1d")
		for (var i = 0; i < iKeywords.length; ++i) {
				var keywords1 = iKeywords[i];
				embed.addField(""+i+"",""+keywords1+"");
				if(i == iKeywords.length-1) message.channel.send({embed: embed});
		}
}
    for (var i = 0; i < iKeywords.length; ++i) {
        if (message1 === iKeywords[i]) {
            for (var g = 0; g < iGifs.length; ++g) {
                if (i == g) {
                    var link1 = iGifs[g];
                    message.channel.send(""+link1+"");
                }
            }
        }
    }
});
///////////////////////////////////////////////////////////////////////////////
///Save Notes to Drives////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
bot.on('message', message => {
    if (message.author.bot) return;
    if (message.content.indexOf('Note') != -1) {
        if (message.author.username === "HikKi") {
            var path = "D:/notes.txt";
            var messageArray = message.content.split(" ");
            fs.appendFile(path,""+message.content+"\r\n",function(err) {});
            message.delete([1])
        }
    }
});
///////////////////////////////////////////////////////////////////////////////
///Personal memes outside//////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

///pokemon
bot.on('message', message => {
  if (message.content === 'I wanna be the very best') {
    message.channel.send('https://www.youtube.com/watch?v=zGkcnUy3l-c');
  }
});
///stewzord dead
bot.on('message', message => {
  if (message.content === 'STEWZORD') {
    message.channel.send('He dead jim http://imgur.com/OjieDzz');
  }
});
///My name is cloud
bot.on('message', message => {
  if (message.content === "mynameiscloud") {
    message.channel.send('https://www.youtube.com/watch?v=kbOJkOoJh6Y');
  }
});

///////////////////////////////////////////////////////////////////////////////
////Show's user avatar/////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

bot.on('message', message => {
  if (message.content === 'what is my avatar') {
		if (message.author.avatarURL == null) message.reply("No Avatar");
		else message.reply(message.author.avatarURL);
  }
});

///////////////////////////////////////////////////////////////////////////////
///Other servers command for ! as prefix etc///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

bot.on("ready", async () => {
	console.log(`Bot is ready! ${bot.user.username}`);
	try {
		let link = await bot.generateInvite(["ADMINISTRATOR"]);
		console.log(link);
	} catch(e) {
		console.log(e.stack);
	}
});
bot.on("message", async message => {
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;
	let messageArray = message.content.split(" ");
	let command = messageArray[0];
	let args = messageArray.slice(1);
	if(!command.startsWith(botSettings.prefix)) return;
	let cmd = bot.commands.get(command.slice(prefix.length))
	if(cmd) cmd.run(bot, message, args);
});
bot.login(botSettings.token);
