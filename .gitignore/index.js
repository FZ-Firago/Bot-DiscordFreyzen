const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = "*"

client.login(process.env.TOKEN);

client.on("ready" , () => {
    client.user.setGame("Freyzen.exe");
});

client.on("message", message => {
    if(message.content === "Bonjour"){
        message.reply("salut ! :D");
        console.log("le bot a dit bonjour");
    }
    if(message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
        .setColor("#FF0000")
        .setTitle("AIDE")
        .setDescription("voila mes commandes !")
        .addField(prefix + "help' ","pour afficher tout les commandes")
        .addField("dites 'Bonjour'","il répond !")
        .addField(prefix + "kick" , "pour kick un utilisateur")
        .addField(prefix + "ban" , "pour ban un utilisateur")
        .setFooter("pour toute autres information veuillez cliquez ici")
        message.channel.sendMessage(help_embed)
        console.log("@user a effectuer la commande d'aide");
    }
    




if(message.content.startsWith(prefix + "kick")) {
    if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("vous n'avez pas la permission")
    
    if(message.mentions.users.size === 0) {
        return message.channel.send("vous devez mentionner un utilisateur")
    }
    var kick = message.guild.member(message.mentions.users.first());
        if(!kick) {
            return message.channel.send("je ne sais pas si l'utilisateur :/")
        }
        if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
        return message.channel.send("je n'ai pas la permission pour kick");
        }
        kick.kick().then(member => {
            message.channel.send(`${member.user.username} est kick par ${message.author.username}`);
        });
}

if(message.content.startsWith(prefix + "ban")) {
    if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("vous n'avez pas la permission pour ban");

    if(message.mentions.users.size === 0) {
        return message.channel.send("vous devez mentionner un utilisateur")
    }
    var ban = message.guild.member(message.mentions.user.first());
    if(!ban) {
        return message.channel.send("je ne sais pas si l'utilisateur existe");
    }
    if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
        return message.channel.send("je n'ai pas la permission pour ban");
    }
    ban.ban().then(member => {
        message.channel.send(`${member.user.username} est ban par ${message.author.username}`)
    })
}
});
