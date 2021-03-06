
const Discord = require('discord.js');
var fs = require("file-system")
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('database.json')
const db = low(adapter);

db.defaults({ histoires: [], xp: []}).write()

const bot = new Discord.Client();

var prefix = "/"



bot.login(process.env.TOKEN);

bot.on("ready" , () => {
    bot.user.setActivity("Le Serveur" , {type:("WATCHING")});
    //bot.user.setGame("Freyzen.exe");
});

bot.on("message", message => {
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
        if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
        return message.channel.send("je n'ai pas la permission pour kick");
        }
        kick.kick().then(member => {
            message.channel.send(`${member.user.username} est kick par ${message.author.username}`);
        });
}

if(message.content.startsWith(prefix + "ban")) {
    if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("vous n'avez pas la permission pour ban");

    if(message.mentions.users.size === 0) {
        return message.channel.send("Vous devez mentionner un utilisateur")
    }
    var ban = message.guild.member(message.mentions.user.first());
    if(!ban) {
        return message.channel.send("Je ne sais pas si l'utilisateur existe");
    }
    if(!message.guild.member(bot.user).hasPermission("BAN_MEMBERS")) {
        return message.channel.send("je n'ai pas la permission pour ban");
    }
    ban.ban().then(member => {
        message.channel.send(`${member.user.username} est ban par ${message.author.username}`)
    })
}

         
         let messageArray = message.content.split(" ");
         let cmd = messageArray[0];
         let args = messageArray.slice(1);
if(cmd === `${prefix}report`){
    let User = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!User)   return message.channel.send("Je ne trouve pas l'utilisateur")
    let reason = args.join(" ").slice(22);
    let reportEmbed = new Discord.RichEmbed()
    .setTitle("Reports")
    .setDescription("les Signalement des joueurs")
    .setColor("#40A497")
    .addField("Joueurs Signalé", `${User} et l'ID Utilisateur: ${User.id}`)
    .addField("Signalé par" , `${message.author} et L'ID Utilisateur: ${message.author.id}`)
    .addField("Channel:" , message.channel)
    .addField("Heure" , message.createdAt)
    .addField("Raison" , reason);
    

    let reportchannel = message.guild.channels.find('name' , "reports");
    if(!reportchannel) return message.channel.send("Je ne peut pas trouver le channel 'reports'")
    message.delete().catch(O_o=>{});
    reportchannel.send(reportEmbed);

}  
            

    var msgauthor = message.author.id;

    if(message.author.bot)return;
       
    if(!db.get("xp").find({user: msgauthor}).value()){
        db.get("xp").push({user: msgauthor, xp: 1}).write();
    }else{
        var userxpdb = db.get("xp").filter({user: msgauthor}).find('xp').value();
        console.log(userxpdb);
        var userxp = Object.values(userxpdb)
        console.log(userxp)
        console.log(`Nombre d'XP: ${userxp[1]}`)

        db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();

        if(message.content === prefix + "xp"){
            var xp = db.get("xp").filter({user: msgauthor}).find('xp').value();
            var xpfinal = Object.values(xp);
            var xp_embed = new Discord.RichEmbed()
                .setTitle(`Stats des xp de ${message.author.username}`)
                .setColor('#40A497')
                .setDescription("Affichage des XP")
                .addField("XP:", `${xpfinal[1]} xp`)
                .setFooter("Aurevoir ! :D")
                message.channel.send({embed: xp_embed});
        }
    }
        
         
    return;
    }
    
    

)
