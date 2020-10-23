require("events").EventEmitter.defaultMaxListeners = 200;
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://glitchprov2.glitch.me/`);
}, 280000);

////بكجات
const { Client, RichEmbed } = require("discord.js");
var { Util } = require("discord.js");
const { prefix, devs } = require("./config");
const client = new Client({ disableEveryone: true });
const ytdl = require("ytdl-core");
const canvas = require("canvas");
const convert = require("hh-mm-ss");
const fetchVideoInfo = require("youtube-info");
const botversion = require("./package.json").version;
const simpleytapi = require("simple-youtube-api");
const moment = require("moment");
const fs = require("fs");
const util = require("util");
const gif = require("gif-search");
const opus = require("node-opus");
const ms = require("ms");
const jimp = require("jimp");
const { get } = require("snekfetch");
const guild = require("guild");
const dateFormat = require("dateformat");
const YouTube = require("simple-youtube-api");
const youtube = new YouTube("AIzaSyAXaeBh837k38o_lwSADet8UTO7X21DGsY"); //تعديل اساسي سوي اي بي اي جديد
const hastebins = require("hastebin-gen");
const getYoutubeID = require("get-youtube-id");
const yt_api_key = "AIzaSyAXaeBh837k38o_lwSADet8UTO7X21DGsY"; ///تعديل اساسي سوي اي بي اي جديد
const pretty = require("pretty-ms");
client.login(process.env.TOKEN);
const queue = new Map();
var table = require("table").table;
const Discord = require("discord.js");
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});



//كود البرودكاست

client.on("message", async message => {
    if (!message.guild || message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (message.content.startsWith(prefix + "bc")) {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply('You dont have Permissions.');
        if (message.guild.interval) return message.reply('**بث آخر قيد التشغيل ، الرجاء الانتظار حتى ينتهي**')
        let args = message.content
            .split(" ")
            .slice(1)
            .join(" ");
        if (!args)
            return message.reply('**يرجى إرسال رسالة بعد الأمر لإرسالها**');

        message.channel
            .send(
                ">>> **[1] جميع الاعضاء\n[2] الاعضاء المتصلين\n[3] الرتب الخاصة\n[0] الغاء الأمر**"
            )
            .then(m => {
                message.channel
                    .awaitMessages(msg => msg.author.id === message.author.id, {
                        max: 1,
                        time: 1000 * 60 * 2,
                        errors: ["time"]
                    })
                    .then(async (c) => {
                        var members = null;
                        if (c.first().content === "1") {
                            members = message.guild.members.array();
                            c.first().delete().catch (err => null);
                            m.delete().catch (err => null);
                        }
                        if (c.first().content === "2") {
                            members = message.guild.members
                                .filter(m => m.presence.status !== "offline").array();

                            c.first().delete().catch (err => null);
                            m.delete().catch (err => null);
                        }
                        if (c.first().content == "0") {
                            c.first().delete().catch (err => null);
                            m.delete().catch (err => null);
                            message.channel.send("**تم الغاء الامر بنجاح**");
                        }
                        if (c.first().content === "3") {
                            m.edit("**>>> ادخل اسم الرتبة من فضلك**").then(ms => {
                                message.channel
                                    .awaitMessages(msg => msg.author.id === message.author.id, {
                                        max: 1,
                                        time: 1000 * 60 * 2,
                                        errors: ["time"]
                                    })
                                    .then(async collected => {
                                        let role = message.guild.roles.find(
                                            role => role.name === collected.first().content
                                        );
                                        if (!role)
                                            return message.channel
                                                .send("**:x: لا استطيع العثور على الرتبة الخاصة بالرسالة**")
                                                .then(() => {
                                                    ms.delete().catch (err => null);
                                                    collected.first().delete().catch (err => null);
                                                });

                                        let roleID = role.id;
                                        members = message.guild.roles.get(roleID).members.array();
                                        if (members == null) return message.reply('**رقم غير صالح**');
                                        if (members.length == 0) return message.reply('**لم يتم العثور على الرقم.**');
                                        else {
                                            const msg = await message.channel.send(`**جاري إرسال الرسالة إلى ${members.length} عضواً...**`)
                                            var count = 0;
                                            var ycount = 0;
                                            var xcount = 0;
                                            message.guild.interval = await setInterval(() => {
                                                if (!members[count]) {
                                                    clearInterval(message.guild.inter);
                                                    msg.edit(new Discord.RichEmbed().setDescription(`** :mailbox_with_mail:  ؛ تم أرسال الرسالة الى  ${ycount} عضواً\n:lock: ؛ و لم أستطع أرسال الرسالة إلى ${xcount} عضواً**`).setTimestamp());
                                                    message.guild.interval = false;
                                                } else if (!members[count].user.bot) {
                                                    members[count].send(`${args}`).then(() => {
                                                        ycount++;
                                                    }).catch(err => {
                                                        return xcount++;
                                                    });
                                                }
                                                count++;
                                            }, 500)
                                        }
                                        collected.first().delete();
                                        m.delete();
                                    }).catch(err => {
                                        return ms.delete().catch (err => null);
                                    })
                            });
                        };
                        if (['1', '2'].includes(c.first().content)) {
                            if (members == null) return message.reply('**رقم غير صالح**');
                            if (members.length == 0) return message.reply('**لم يتم العثور على الرقم.**');
                            else {
                                const msg = await message.channel.send(`**جاري إرسال الرسالة إلى ${members.length} عضواً...**`)
                                var count = 0;
                                var ycount = 0;
                                var xcount = 0;
                                message.guild.interval = await setInterval(() => {
                                    if (!members[count]) {
                                        clearInterval(message.guild.inter);
                                        msg.edit(new Discord.RichEmbed().setDescription(`** :mailbox_with_mail:  ؛ تم أرسال الرسالة الى  ${ycount} عضواً\n:lock: ؛ و لم أستطع أرسال الرسالة إلى ${xcount} عضواً**`).setTimestamp());
                                        message.guild.interval = false;
                                    } else if (!members[count].user.bot) {
                                        members[count].send(`${args}`).then(() => {
                                            ycount++;
                                        }).catch(err => {
                                            return xcount++;
                                        });
                                    }
                                    count++;
                                }, 500)
                            }
                        }


                    })
                    .catch((err) => {
                        return m.delete().catch (err => null);
                    });
            });
    } else if (message.content.startsWith(prefix + "hylfyukdtukdtlfhjlfyrfyu")) {
        let args = message.content
            .split(" ")
            .slice(1)
            .join(" ");
        if (!message.author.id === "") return; ///تعديل مهم حط الايدي تبعك
        client.user.setUsername(args);
        message.channel.send(`تم تغيير الاسم الى ..**${args}** `);
    } else if (message.content.startsWith(prefix + "yulfhjkdyljdy;fylfy")) {
        let args = message.content
            .split(" ")
            .slice(1)
            .join(" ");
        if (!message.author.id === "") return; /// تعديل مهم حط الايدي تبعك
        client.user.setAvatar(args).catch(err => message.reply("send a valid url"));
        message.channel.send(`تم تغيير الصورة الى :**${args}** `);
    }
});



var statuss = ["#help","#inv"]; 
var secound = 2; 
client.on("ready", () =>{
  var timeing = Math.floor(secound*1000);
  setInterval(function(){
    var ammount = statuss.length;
    var num = Math.floor(Math.random() * ammount);
    client.user.setActivity(statuss[num], {type: 'PLAYING'})
  }, timeing)
});

client.on("message", message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "say") {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "**ADMINISTRATOR ليس لديك صلاحيات :rolling_eyes:**"
      );

    message.channel.send("`#` " + args.join("  "));
    message.delete();
  }
});

////كود تيكت
client.on("message", message => {
  if (message.content.startsWith(prefix + "new")) {
    const reason = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!message.guild.roles.exists(gg => gg.name === "Support Team"))
      return message.channel.send(`لازم تسوي رتبة اسمها \`Support Team\`.`);
    if (
      message.guild.channels.filter(
        Channel =>
          Channel.name == `ticket-${message.author.id}` &&
          Channel.type == "text"
      ).size > 0
    )
      return message.channel.send(`You already have a ticket open.`);
    message.guild
      .createChannel(`ticket-${message.author.id}`, "text")
      .then(c => {
        let role = message.guild.roles.find(gg => gg.name === "Support Team");
        let role2 = message.guild.roles.find(gg => gg.name === "@everyone");
        c.overwritePermissions(role, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
        });
        c.overwritePermissions(message.author, {
          SEND_MESSAGES: true,
          READ_MESSAGES: true
        });
        c.overwritePermissions(message.guild.id, {
          READ_MESSAGES: false
        });
        message.channel.send(
          `:white_check_mark: Your ticket has been created, ${c}.`
        );
        const embed = new Discord.RichEmbed()
          .setColor(0xcf40fa)
          .addField(
            `Hey ${message.author.username}!`,
            `Please try explain why you opened this ticket with as much detail as possible. Our **Support Staff** will be here soon to help.`
          )
          .setTimestamp();
        c.send({
          embed: embed
        });
      })
      .catch(console.error);
  } else if (message.content.startsWith(prefix + "close")) {
    if (!message.guild.roles.exists(gg => gg.name === "Support Team"))
      return message.channel.send(` لازم تسوي رتبة اسمها \`Support Team\`.`);
    if (!message.channel.name.startsWith("ticket-"))
      return message.channel.send("This isn't a ticket channel!");
    if (
      !message.member.roles.has(
        message.guild.roles.filter(r => r.name === "Support Team").first().id
      )
    )
      return message.channel.send("You don't have the `Support Team` role!");
    message.channel
      .delete()
      .catch(e => message.channel.send("Check my permissions!"));
  }
});

client.on("message", async message => {
  if (!message.guild || message.author.bot) return;
  let args = message.content.split(" ");
  if (args[0] == `${prefix}cr`) {
    if (
      !message.guild.me.hasPermission("MANAGE_ROLES") ||
      !message.member.hasPermission("MANAGE_ROLES")
    )
      return;
    if (!args[1] || !args[2])
      return message.reply(
        `Usage: ${args[0]} [role color] [role name]\nExample: ${
          args[0]
        } blue Admin`
      );
    try {
      let role = await message.guild.createRole({
        name: args.slice(2).join(" ") || "new role",
        color: args[1].toUpperCase() || null
      });
      await message.reply(`Done, Created **${role.name}** role!`);
    } catch (e) {
      message.reply(`Error! ${e.message || e}`);
    }
  }
});

//// كود معلومات الشخص او اليوزر
client.on("message", pixelbot => {
  // itzZa1D - Codes Team.
  if (pixelbot.content.startsWith(prefix + "user")) {
    // itzZa1D - Codes Team.
    if (pixelbot.author.bot) return;
    if (!pixelbot.guild)
      return pixelbot.reply("**:x: - This Command is only done on Servers**");
    pixelbot.guild.fetchInvites().then(invites => {
      // itzZa1D - Codes Team.
      let personalInvites = invites.filter(
        i => i.inviter.id === pixelbot.author.id
      );
      let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0);
      var roles = pixelbot.member.roles
        .map(roles => `**__${roles.name}__ |**`)
        .join(` `);
      let pixeluser = new Discord.RichEmbed() // itzZa1D - Codes Team.
        .setColor("#00000")
        .setTitle(" :beginner: :heartpulse:   | Use  r Info") // itzZa1D - Codes Team.
        .setAuthor(pixelbot.author.username, pixelbot.author.avatarURL)
        .addField("**✽ Name :**   ", pixelbot.author.username, true)
        .addField("**✽ Tag :**   ", pixelbot.author.discriminator, true)
        .addField("**✽ ID :** ", pixelbot.author.id, true) // itzZa1D - Codes Team.
        .addField(
          "**✽ Joined At :**   ",
          moment(pixelbot.joinedAt).format("D/M/YYYY h:mm a "),
          true
        )
        .addField(
          "**✽ Created At :**    ",
          moment(pixelbot.author.createdAt).format("D/M/YYYY h:mm a "),
          true
        )
        .addField("**✽ Total invites :**    ", inviteCount, true)
        .setTimestamp(); // itzZa1D - Codes Team.

      pixelbot.channel.sendEmbed(pixeluser).then(c => {}); // itzZa1D - Codes Team.
    });
  }
}); // itzZa1D - Codes Team.

////كود معلومات البوت
client.on("message", message => {
  if (message.content === prefix + "bot") {
    const bot = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor("#00000")
      .addField(
        "✽ **Bot Ping** : ",
        `» ${Date.now() - client.createdTimestamp}` + " ms",
        true
      )
      .addField("**Servers** :  ", `» ${client.guilds.size}`, true)
      .addField("**Channels** : ", `» ${client.channels.size} `, true)
      .addField("**Users** : ", `» ${client.users.size} `, true)
      .addField("**Bot Name** :  ", `» ${client.user.tag} `, true)
      .addField("**Bot Owner** :  ", `» <@748065198333755423>`, true) // تعديل اساسي غير الايدي لايدي حسابك
      .setImage("")
      .setFooter(message.author.username, message.client.avatarURL);
    message.channel.send(bot);
  }
});

client.on("message", message => {
  if (message.author.codes) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "ban") {
    if (message.author.bot) return;
    if (!message.channel.guild)
      return message.reply("** This command only for servers**");

    if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS"))
      return message.reply("**انت لا تملك الصلاحيات المطلوبه**");
    if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS"))
      return message.reply("**I Don't Have ` BAN_MEMBERS ` Permission**");
    let user = message.mentions.users.first();

    if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
    if (
      message.mentions.members.first().highestRole.position >=
      message.member.highestRole.position
    )
      return message.channel.send("ما تقدر تبند شخص رتبته اعلى منك!");
    if (!message.guild.member(user).bannable)
      return message.reply(
        "**يجب ان تكون رتبة البوت اعلي من رتبه الشخص المراد تبنيدة**"
      );

    message.guild.member(user).ban(7, user);

    message.channel.send(
      `**:white_check_mark: ${user.tag} banned from the server ! :airplane: **  `
    );
  }
});
client.on("message", async message => {
  if (message.content.startsWith(prefix + "inf")) {
    let oi = message.mentions.users.first()
      ? message.mentions.users.first().id
      : message.author.id;
    let Tag = message.mentions.users.first()
      ? message.mentions.users.first().tag
      : message.author.tag;
    let Username = message.mentions.users.first()
      ? message.mentions.users.first().username
      : message.author.username;
    let Avatar = message.mentions.users.first()
      ? message.mentions.users.first().avatarURL
      : message.author.avatarURL;

    message.guild.fetchInvites().then(invs => {
      let member = client.guilds.get(message.guild.id).members.get(oi);
      let personalInvites = invs.filter(i => i.inviter.id === oi);
      let urll = invs.filter(i => i.inviter.id === oi);
      let link = urll.reduce(
        (p, v) =>
          v.url + ` , Total de membros recrutados no convite: ${v.uses}.\n` + p,
        `\nServidor: ${message.guild.name} \n `
      );
      let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0);
      let inviteCode = personalInvites.reduce((p, v) => v.code);
      let possibleInvites = [["Total de membros recrutados:"]];
      possibleInvites.push([inviteCount, inviteCode]);
      let user = message.mentions.users.first() || message.author;
      let mem = message.guild.member(user);
      let millisJoined = new Date().getTime() - mem.joinedAt.getTime();
      let daysJoined = millisJoined / 1000 / 60 / 60 / 24;
      console.log(inviteCode);
      var inviteInfo = new Discord.RichEmbed()
        .setTitle(`:incoming_envelope: **[INVITE INFO]** ${Username}`)
        .addField(
          "**عدد الدعوات للسيرفر**",
          `[ شخص **${Number(inviteCount)}** ]   `
        )
        .addField(
          "**تاريخ انضمامك لسيرفرنا **",
          ` [ منذ  **${daysJoined.toFixed(0)}** يوم ]   `
        )
        .addField(
          "**رابط الدعوة الذي دخلت منه**  ",
          `[ **${
            inviteCode &&
            inviteCode.code &&
            inviteCode.code.includes("discord.gg")
              ? inviteCode.code
              : `https://discord.gg/${inviteCode.code || "vHmbKTE"}`
          }** ]   `
        )
        .setImage("")
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(Tag, Avatar);

      message.channel.send(inviteInfo);
    });
  }
});

client.on("message", message => {
  if (message.author.x5bz) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "kick") {
    if (message.author.bot) return;
    if (!message.channel.guild)
      return message.reply("** This command only for servers**");

    if (!message.guild.member(message.author).hasPermission("KICK_MEMBERS"))
      return message.reply("**You Don't Have ` KICK_MEMBERS ` Permission**");
    if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS"))
      return message.reply("**I Don't Have ` KICK_MEMBERS ` Permission**");
    let user = message.mentions.users.first();
    let reason = message.content
      .split(" ")
      .slice(2)
      .join(" ");
    if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
    if (!reason) return message.reply("**اكتب سبب الطرد**");
    if (!message.guild.member(user).kickable)
      return message.reply(
        "**لايمكنني طرد شخص اعلى من رتبتي يرجه اعطاء البوت رتبه عالي**"
      );
    if (
      message.mentions.members.first().highestRole.position >=
      message.member.highestRole.position
    )
      return message.channel.send("ما تقدر تطرد شخص رتبته اعلى منك!");

    message.guild.member(user).kick();

    const kickembed = new Discord.RichEmbed()
      .setAuthor(`KICKED!`, user.displayAvatarURL)
      .setColor("RANDOM")
      .setTimestamp()
      .addField("**User:**", "**[ " + `${user.tag}` + " ]**")
      .addField("**By:**", "**[ " + `${message.author.tag}` + " ]**")
      .addField("**Reason:**", "**[ " + `${reason}` + " ]**");
    message.channel.send({
      embed: kickembed
    });
  }
});
client.on("message", message => {
  if (message.content.split(" ")[0] === prefix + "avt") {
    if (message.author.bot || message.channel.type == "dm") return;
    var args = message.content.split(" ")[1];
    var avt = args || message.author.id;
    client
      .fetchUser(avt)
      .then(user => {
        avt = user;
        let avtEmbed = new Discord.RichEmbed()
          .setColor("#36393e")
          .setAuthor(`${avt.username}'s Avatar`, message.author.avatarURL)
          .setImage(avt.avatarURL)
          .setFooter(`Avatar`, message.client.user.avatarURL);
        message.channel.send(avtEmbed);
      })
      .catch(() => message.channel.send(`يجب عليك وضع ايدي الشخص`));
  } // Julian
}); // Codes - Toxic Codes

const SQLite = require("sqlite"); // SQLpackage
const path = require("path"); // PATHpackage
const invites = {}; // Codes

////كود معلومات السيرفر
client.on("message", message => {
  if (message.content.startsWith(prefix + "server")) {
    if (!message.channel.guild)
      return message.channel.send(` | This Command is used only in servers!`);
    const millis = new Date().getTime() - message.guild.createdAt.getTime();
    const now = new Date();
    const verificationLevels = ["None", "Low", "Medium", "Insane", "Extreme"];
    const days = millis / 1000 / 60 / 60 / 24;
    var embed = new Discord.RichEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL)
      .addField(":id:✽** Server ID:**", `» ${message.guild.id} `, true)
      .addField(
        ":calendar:✽** Created On**",
        `» ${message.guild.createdAt.toLocaleString()}`,
        true
      )
      .addField(":crown: ✽**Server Owner**", `**${message.guild.owner}**`, true)
      .addField(
        `✽** Members ** [${message.guild.members.size}]`,
        `**${
          message.guild.members.filter(c => c.presence.status !== "offline")
            .size
        }** **Online**`,
        true
      )
      .addField(
        ":speech_balloon:✽** Channels **",
        `» **${message.guild.channels.filter(m => m.type === "text").size}**` +
          " TexT | VoicE  " +
          `**${message.guild.channels.filter(m => m.type === "voice").size}** `,
        true
      )
      .addField(":earth_africa:✽** Region **", ` ${message.guild.region}`, true)
      .setImage("")

      .setColor("#000000");
    message.channel.sendEmbed(embed);
  }
});

client.on("message", message => {
  if (message.author.bot) return;

  let command = message.content.split(" ")[0];

  if (command === prefix + "unmute") {
    if (message.author.bot) return;
    if (!message.member.hasPermission("MANAGE_ROLES"))
      return message
        .reply("** لا يوجد لديك برمشن 'Manage Roles' **")
        .catch(console.error);
    let user = message.mentions.users.first();
    let modlog = client.channels.find(gg => gg.name === "log");
    let muteRole = client.guilds
      .get(message.guild.id)
      .roles.find(gg => gg.name === "Muted");
    if (!muteRole)
      return message
        .reply("** لا يوجد لديك رتبه الميوت 'Muted' **")
        .catch(console.error);
    if (message.mentions.users.size < 1)
      return message
        .reply("** يجب عليك منشنت شخص اولاً**")
        .catch(console.error);
    const embed = new Discord.RichEmbed()
      .setColor(0x00ae86)
      .setTimestamp()
      .addField("الأستعمال:", "اسكت/احكي")
      .addField(
        "تم فك الميوت عن:",
        `${user.username}#${user.discriminator} (${user.id})`
      )
      .addField(
        "بواسطة:",
        `${message.author.username}#${message.author.discriminator}`
      );

    if (
      !message.guild
        .member(client.user)
        .hasPermission("MANAGE_ROLES_OR_PERMISSIONS")
    )
      return message
        .reply("** لا يوجد لدي برمشن Manage Roles **")
        .catch(console.error);

    if (message.guild.member(user).removeRole(muteRole.id)) {
      return message
        .reply("**:white_check_mark: .. تم فك الميوت عن الشخص **")
        .catch(console.error);
    } else {
      message.guild
        .member(user)
        .removeRole(muteRole)
        .then(() => {
          return message
            .reply("**:white_check_mark: .. تم فك الميوت عن الشخص **")
            .catch(console.error);
        });
    }
  }
});

////كود ميوت او اسكات
client.on("message", message => {
  if (message.author.bot) return;

  let command = message.content.split(" ")[0];

  if (command === prefix + "mute") {
    if (message.author.bot) return;
    if (!message.member.hasPermission("MANAGE_ROLES"))
      return message
        .reply("** لا يوجد لديك برمشن 'Manage Roles' **")
        .catch(console.error);
    let user = message.mentions.users.first();
    let modlog = client.channels.find(gg => gg.name === "log");
    let muteRole = client.guilds
      .get(message.guild.id)
      .roles.find(gg => gg.name === "Muted");
    if (!muteRole)
      return message
        .reply("** لا يوجد رتبة الميوت 'Muted' **")
        .catch(console.error);
    if (message.mentions.users.size < 1)
      return message
        .reply("** يجب عليك منشنت شخص اولاً**")
        .catch(console.error);

    const embed = new Discord.RichEmbed()
      .setColor(0x00ae86)
      .setTimestamp()
      .addField("الأستعمال:", "اسكت/احكي")
      .addField(
        "تم ميوت:",
        `${user.username}#${user.discriminator} (${user.id})`
      )
      .addField(
        "بواسطة:",
        `${message.author.username}#${message.author.discriminator}`
      );

    if (
      !message.guild
        .member(client.user)
        .hasPermission("MANAGE_ROLES_OR_PERMISSIONS")
    )
      return message
        .reply("** لا يوجد لدي برمشن Manage Roles **")
        .catch(console.error);

    if (message.guild.member(user).roles.has(muteRole.id)) {
      return message
        .reply("**:white_check_mark: .. تم اعطاء العضو ميوت**")
        .catch(console.error);
    } else {
      message.guild
        .member(user)
        .addRole(muteRole)
        .then(() => {
          return message
            .reply("**:white_check_mark: .. تم اعطاء العضو ميوت كتابي**")
            .catch(console.error);
        });
    }
  }
});

//// كود فتح واغلاق الروم
client.on("message", message => {
  if (message.content === prefix + "lock") {
    if (!message.channel.guild)
      return message.reply(" هذا الامر فقط للسيرفرات !!");

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply(" ليس لديك صلاحيات");
    message.channel
      .overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
      })
      .then(() => {
        message.reply("**تم قفل الشات :no_entry: **");
      });
  }
  if (message.content === prefix + "unlock") {
    if (!message.channel.guild)
      return message.reply(" هذا الامر فقط للسيرفرات !!");

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply("ليس لديك صلاحيات");
    message.channel
      .overwritePermissions(message.guild.id, {
        SEND_MESSAGES: true
      })
      .then(() => {
        message.reply("**تم فتح الشات :white_check_mark:**");
      });
  }
});

client.on("error", err => {
  console.log(err);
});

client.on("messageCreate", async message => {
  let args = message.cleanContent.split(" ");
  if (args[0] == `${prefix}roles`) {
    let space = "                         ";
    let roles = message.guild.roles
      .map(r => r)
      .sort((a, b) => b.position - a.position);
    let rr = roles
      .map(
        r =>
          `${r.name +
            space.substring(r.name.length) +
            message.guild.members.filter(m => m.roles.includes(r.id))
              .length} members`
      )
      .join("\n");
    await message.channel.sebd(`\`\`\`${rr}\`\`\``);
  }
});

//// كود سحب شخص
client.on("message", message => {
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "move")) {
    if (message.member.hasPermission("MOVE_MEMBERS")) {
      if (message.mentions.users.size === 0) {
        return message.channel.send("``Use : " + prefix + "move @User``");
      }
      if (message.member.voiceChannel != null) {
        if (message.mentions.members.first().voiceChannel != null) {
          var authorchannel = message.member.voiceChannelID;
          var usermentioned = message.mentions.members.first().id;
          var embed = new Discord.RichEmbed()
            .setTitle("Succes!")
            .setColor("#000000")
            .setDescription(
              `✅ You Have Moved <@${usermentioned}> To Your Channel `
            );
          var embed = new Discord.RichEmbed()
            .setTitle(`You are Moved in ${message.guild.name} `)
            .setColor("RANDOM")
            .setTitle(`✽ **Premium**`)

            .setDescription(
              `**<@${message.author.id}> Moved You To His Channel!\nServer --> ${message.guild.name}**`
            );
          message.guild.members
            .get(usermentioned)
            .setVoiceChannel(authorchannel)
            .then(m => message.channel.send(embed));
          message.guild.members.get(usermentioned).send(embed);
        } else {
          message.channel.send(
            "`You Cant Move" +
              message.mentions.members.first() +
              " `The User Should Be In channel To Move It`"
          );
        }
      } else {
        message.channel.send(
          "**``You Should Be In Room Voice To Move SomeOne``**"
        );
      }
    } else {
      message.react("❌");
    }
  }
});


client.on('message', message => {
    if (message.content === prefix + 'bserver') {
        const embed = new Discord.MessageEmbed()
            .setAuthor(client.user.username, client.user.avatarURL)
            .setColor("RANDOM")
            .addField('**Servers**', `➠${client.guilds.cache.size}`)
            .setFooter(`Requested by ${message.author.username}`)
        message.channel.send(embed)
    }
}); // bot of servers

client.on('message', message => {
    if (message.content === prefix + 'devbot') {
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM") // by SaifDemos .Layer Coding
            .addField('**Name**', `➠ <@748065198333755423>`)
            .addField('**Age**', `➠ 16`)
            .addField('**Country**', `➠ السعودية`)
            .setFooter(`Requested by ${message.author.username}`) // by SaifDemos .Layer Coding
        message.channel.send(embed)
    }
}); // deves bot code by SaifDemos .Layer Coding

client.on("message", function(message) {
  if (!message.channel.guild) return;
  if (message.author.bot) return;
  if (message.author.id === client.user.id) return;
  if (message.author.equals(client.user)) return;
  if (!message.content.startsWith(prefix)) return;

  var args = message.content.substring(prefix.length).split(" ");
  switch (args[0].toLocaleLowerCase()) {
    case "clear":
      message.delete();
      if (!message.channel.guild) return;
      if (message.member.hasPermission(0x2000)) {
        if (!args[1]) {
          message.channel.fetchMessages().then(messages => {
            message.channel.bulkDelete(messages);
            var messagesDeleted = messages.array().length;
            message.channel
              .send(
                " " +
                  "**```fix\n" +
                  messagesDeleted +
                  " " +
                  ": عدد الرسائل التي تم مسحها" +
                  "```**"
              )
              .then(m => m.delete(5000));
          });
        } else {
          let messagecount = parseInt(args[1]);
          message.channel
            .fetchMessages({ limit: messagecount })
            .then(messages => message.channel.bulkDelete(messages));
          message.channel
            .send(
              " " +
                "**```fix\n" +
                args[1] +
                " " +
                ": عدد الرسائل التي تم مسحها" +
                "```**"
            )
            .then(m => m.delete(5000));
          message.delete(60000);
        }
      } else {
        var manage = new Discord.RichEmbed()
          .setDescription("You Do Not Have Permission MANAGE_MESSAGES :(")
          .setColor("RANDOM");
        message.channel.sendEmbed(manage);
        return;
      }
  }
});
///تعديل غير اساسي
////كود هيلب
client.on("message", message => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + "help")) {
    if (message.author.id == message.guild.ownerID) {
          message.author
    .send(
      `   
**|  Command General  |**

#bot > info bot معلومات البوت
 
#user >info user معلومات الشخص

#avt > Show Your Avatar رؤية الصورة الشخصية الخاصة بك

#avatar <ID Member> >Show The Avatar member رؤية الصورة الخاصة باحد الاعضاء عن طريق الايدي (الهوية الشخصية)

#colors > (not Active) Show Colors غير مفعل

#color > Change Colors غير مفعل

#link > Create Link Server انشاء رابط لسيرفرك في الخاص

**|  Command Admin  |**

#clear > Clear Message حذف الرسائل من الروم

#ban > Ban Member حظر العضو
 
#kick > Kick Member طرد العضو

#lock > lock Channel اقفال القناة

#unlock > unlock Channel فتح القناة

#mute > Mute Member كتم العضو

#unmute > Unmute Channel الغاء كتم العضو

#new > Create Ticket انشاء تـــكـــت

#close > Delete Ticket حذف تـــكـــت

#say > Create Replay Automatic انشاء رد تلقائي خاص بسيرفرك

#move > Move Member تحريك العضو

#replay > Replay My Say اعادة ما اقول

#setlog > Set Log In Rom وضع لوقز في الروم

#setby > Set Message Leave وضع راسالة توديع

#setWelcomer <channel name> > Set image To Enter Server وضع صورة عند دخول العضو

#setMessage > Message in image Welcome وضع راساله عند دخول العضو

#setVc <channel Name> > Show Connaction To Voice Online رؤية المتصيل بالدردشة الصوتية

#vc off > Hide Connaction Voice Online اخفاء المتصلين بالدردشة الصوتية

#ls > Show All Bot رؤية جميع البوتات

#role > Give Role A Member اعطاء عضو مخصص رتبه مخصصة

#bc > bot Send in Direct Message All Members Your Server ارسال برودكاست في خاص الاعضاء

#role all > Give Role To All Members اعطاء جميع الاعضاء رتبة مخصصة

**|  Commands Submits  |**


#room1 > Create room Submit انشاء روم تقديمات

#room2 > Create Room Accept and reject انشاء روم قبول ورفض التقديمات


#قبول @اسمه

#رفض @اسمه السبب
`
        )
        .then(() => {
          message.author.send(`

**|  Credits Command  |**

#credits > Show Your Credits رؤية نقودك

#daily > Give Free Credit اخذ نقود كل 24 ساعه مجانا

**|  Music Command  |**
 
#Play :[#p] > Play Music تشغيل الموسيقى
 
#Pause  > Pause Music ايقاف الموسيقى

#Resume > Resume Music استئناف الموسيقى

#stop > Stop Music ايقاف الموسيقى مؤقتا
 
#forceskip 
 
#Queue > Show Music Play رؤية الاغاني التي في الطابور
 
#skipto > Skip To Music You Want التخطي الى الاغنية التي تريدها
 
#Skip :[#s] > Skip To Music Other التخطي الى الموسيقي الاخرى

#Volume > Change Volume Sounds تغير الصوت
 

#Nowplaying :[#np] Show Your Playing ماهي الاغنية الحالية
 
#repeat > repeat Now Playing اعادة الاغنية

#Leave > Exit Bot From Voice Channel اخراج البت من الروم الصوتي

**|  Protection Command  |**

${prefix}settings limitsban > Limits Ban 0-10وضع حد للحظر 

${prefix}settings limitskick > Limits Kick 0-10وضع حد لطرد

${prefix}settings limitsroleD > limits role Delete 0-10وضع حد لحذف الرتب

${prefix}settings limitsroleC > limits Role Create 0-10وضع حد لانشاء الرتب 

${prefix}settings limitschannelD > limite channel Delete 0-10 وضع حد لحذف الرومات
 
${prefix}settings limitstime > Specify the time that, if violating the security orders, will be banned تحديد الوقت افضل شيء 60

#antibots on > Run Anti Bot (bot cannot be added) يمنع دخول البوتات الى سيرفرك

#antibots off > Stop Anti Bot (You Can Added Bot) يسمح للبوتات بدخول سيرفرك

`);
        })
        .then(e => {
          message.react("✅");
        })
        .catch(() => {
          return message.channel
            .send(
              "**يجب السماح بأستقبال الرسائل في الخاص ، لأتمكن من ارسال الاوامر لك **"
            )
            .then(() => {
              return message.react("❌");
            });
        });
    } else {
      message.author
        .send(
          `   
**|  Command General  |**

#bot > info bot معلومات البوت
 
#user >info user معلومات الشخص

#avt > Show Your Avatar رؤية الصورة الشخصية الخاصة بك

#avatar <ID Member> >Show The Avatar member رؤية الصورة الخاصة باحد الاعضاء عن طريق الايدي (الهوية الشخصية)

#colors > (not Active) Show Colors غير مفعل

#color > Change Colors غير مفعل

#link > Create Link Server انشاء رابط لسيرفرك في الخاص

**|  Command Admin  |**

#clear > Clear Message حذف الرسائل من الروم

#ban > Ban Member حظر العضو
 
#kick > Kick Member طرد العضو

#lock > lock Channel اقفال القناة

#unlock > unlock Channel فتح القناة

#mute > Mute Member كتم العضو

#unmute > Unmute Channel الغاء كتم العضو

#new > Create Ticket انشاء تـــكـــت

#close > Delete Ticket حذف تـــكـــت

#say > Create Replay Automatic انشاء رد تلقائي خاص بسيرفرك

#move > Move Member تحريك العضو

#replay > Replay My Say اعادة ما اقول

#setlog > Set Log In Rom وضع لوقز في الروم

#setby > Set Message Leave وضع راسالة توديع

#setWelcomer <channel name> > Set image To Enter Server وضع صورة عند دخول العضو

#setMessage > Message in image Welcome وضع راساله عند دخول العضو

#setVc <channel Name> > Show Connaction To Voice Online رؤية المتصيل بالدردشة الصوتية

#vc off > Hide Connaction Voice Online اخفاء المتصلين بالدردشة الصوتية

#ls > Show All Bot رؤية جميع البوتات

#role > Give Role A Member اعطاء عضو مخصص رتبه مخصصة

#bc > bot Send in Direct Message All Members Your Server ارسال برودكاست في خاص الاعضاء

#role all > Give Role To All Members اعطاء جميع الاعضاء رتبة مخصصة

**|  Commands Submits  |**


#room1 > Create room Submit انشاء روم تقديمات

#room2 > Create Room Accept and reject انشاء روم قبول ورفض التقديمات


#قبول @اسمه

#رفض @اسمه السبب
`
        )
        .then(() => {
          message.author.send(`

**|  Credits Command  |**

#credits > Show Your Credits رؤية نقودك

#daily > Give Free Credit اخذ نقود كل 24 ساعه مجانا

**|  Music Command  |**
 
#Play :[#p] > Play Music تشغيل الموسيقى
 
#Pause  > Pause Music ايقاف الموسيقى

#Resume > Resume Music استئناف الموسيقى

#stop > Stop Music ايقاف الموسيقى مؤقتا
 
#forceskip 
 
#Queue > Show Music Play رؤية الاغاني التي في الطابور
 
#skipto > Skip To Music You Want التخطي الى الاغنية التي تريدها
 
#Skip :[#s] > Skip To Music Other التخطي الى الموسيقي الاخرى

#Volume > Change Volume Sounds تغير الصوت
 

#Nowplaying :[#np] Show Your Playing ماهي الاغنية الحالية
 
#repeat > repeat Now Playing اعادة الاغنية

#Leave > Exit Bot From Voice Channel اخراج البت من الروم الصوتي

`
                             
    );
        })
        .then(e => {
          message.react("✅");
        })
        .catch(() => {
          return message.channel
            .send(
              "**Open Your Direct Message **"
            )
            .then(() => {
              return message.react("❌");
            });
        });
    }
  }
});


//كود اتصال البوت
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.on("ready", () => {
    client.user.setStatus("online"); ///تعديل مهم لون الحالة
});

//online
//idle
//dnd
//offline


////كود قيف اوي
client.on("message", async message => {
  var room;
  var title; //HactorMC
  var duration; //HactorMC
  var gMembers;
  var filter = m => m.author.id === message.author.id;
  if (message.content.startsWith(prefix + "giveaway")) {
    //return message.channel.send('**في مشكله ببعض الاساسيات من فضلك انتظر شوي**');
    if (!message.guild.member(message.author).hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        ":heavy_multiplication_x:| **You Need Permission Manage Server**"
      );
    message.channel
      .send(`**pls Type Channel Name And Don't Mantion ( # )**`)
      .then(msgg => {
        message.channel
          .awaitMessages(filter, {
            max: 1, //HactorMC
            time: 20000,
            errors: ["time"]
          })
          .then(collected => {
            let room = message.guild.channels.find(
              gg => gg.name === collected.first().content
            );
            if (!room)
              return message.channel.send(
                "**i'can't Found Room|Please Try Again**"
              );
            room = collected.first().content;
            collected.first().delete();
            msgg.edit("**Type Time Give Away**").then(msg => {
              message.channel
                .awaitMessages(filter, {
                  max: 1, //HactorMC
                  time: 20000,
                  errors: ["time"]
                })
                .then(collected => {
                  if (isNaN(collected.first().content))
                    return message.channel.send(
                      ":heavy_multiplication_x:| **You have to set a correct time time.. You have to rewrite The Command``**"
                    );
                  duration = collected.first().content * 60000;
                  collected.first().delete();
                  msgg
                    .edit(
                      ":eight_pointed_black_star:| **Type You Want In GiveAway**"
                    )
                    .then(msg => {
                      message.channel
                        .awaitMessages(filter, {
                          max: 1,
                          time: 20000,
                          errors: ["time"]
                        })
                        .then(collected => {
                          title = collected.first().content;
                          collected.first().delete();
                          try {
                            let giveEmbed = new Discord.RichEmbed()
                              .setAuthor(
                                message.guild.name,
                                message.guild.iconURL
                              )
                              .setTitle(title)
                              .setDescription(
                                `Time : ${duration / 60000} minutes`
                              )
                              .setFooter(
                                message.author.username,
                                message.author.avatarURL
                              );
                            message.guild.channels
                              .find(gg => gg.name === room)
                              .send(giveEmbed)
                              .then(m => {
                                let re = m.react("🎉");
                                setTimeout(() => {
                                  let users = m.reactions.get("🎉").users;
                                  let list = users
                                    .array()
                                    .filter(u => u.id !== m.author.id);
                                  let gFilter =
                                    list[
                                      Math.floor(Math.random() * list.length) +
                                        0
                                    ];
                                  if (users.size === 1)
                                    gFilter = "**Not specified**";
                                  let endEmbed = new Discord.RichEmbed()
                                    .setAuthor(
                                      message.author.username,
                                      message.author.avatarURL
                                    )
                                    .setTitle(title)
                                    .addField(
                                      "End Time GiveAway !",
                                      `Win is : ${gFilter}`
                                    )
                                    .setFooter(
                                      message.guild.name,
                                      message.guild.iconURL
                                    );
                                  m.edit(endEmbed);
                                }, duration);
                              });
                            msgg.edit(
                              `:heavy_check_mark:| **Set Up GiveAway**`
                            );
                          } catch (e) {
                            msgg.edit(
                              `:heavy_multiplication_x:| **i'can't Set Up Give Away,You Need Permission**`
                            );
                            console.log(e);
                          }
                        });
                    });
                });
            });
          });
      });
  }
});
//all copyrighit for revenge https://github.com/Bowlingtoolkit

///تعديل غير اساسي
///تقدر الصورة الخلفية ، شوف الشرح الرابط فوق اول الكود
/// كود الوان
client.on("message", message => {
  if (!message.guild || message.author.bot) return;
  if (message.content == prefix + "colors") {
    var fsn = require("fs-nextra");
    fs.readdir("./colors", async (err, files) => {
      var f = files[Math.floor(Math.random() * files.length)];
      var { Canvas } = require("canvas-constructor");
      var x = 0;
      var y = 0;
      if (message.guild.roles.filter(role => !isNaN(role.name)).size <= 0)
        return;
      message.guild.roles
        .filter(role => !isNaN(role.name))
        .sort((b1, b2) => b1.name - b2.name)
        .forEach(() => {
          x += 100;
          if (x > 100 * 12) {
            x = 100;
            y += 80;
          }
        });
      var image = await fsn.readFile(`./colors/${f}`);
      var xd = new Canvas(100 * 11, y + 350)
        .addBeveledImage(image, 0, 0, 100 * 11, y + 350, 100)
        .setTextBaseline("middle")
        .setColor("white")
        .setTextSize(60)
        .addText(`قائمة الألوان`, 375, 40);
      x = 0;
      y = 150;
      message.guild.roles
        .filter(role => !isNaN(role.name))
        .sort((b1, b2) => b1.name - b2.name)
        .forEach(role => {
          x += 75;
          if (x > 100 * 10) {
            x = 75;
            y += 80;
          }
          xd.setTextBaseline("middle")
            .setTextAlign("center")
            .setColor(role.hexColor)
            .addBeveledRect(x, y, 60, 60, 15)
            .setColor("white");
          if (`${role.name}`.length > 2) {
            xd.setTextSize(30);
          } else if (`${role.name}`.length > 1) {
            xd.setTextSize(40);
          } else {
            xd.setTextSize(50);
          }
          xd.addText(role.name, x + 30, y + 30);
        });
      message.channel.sendFile(xd.toBuffer());
    });
  }
});

/// كود تعين اللوق
const log = JSON.parse(fs.readFileSync("./log.json", "utf8"));

client.on("message", message => {
  if (!message.channel.guild) return;
  let room = message.content.split(" ").slice(1);
  let findroom = message.guild.channels.find(r => r.name == room);
  if (message.content.startsWith(prefix + "setLog")) {
    if (!message.channel.guild)
      return message.reply("**This Command Only For Servers**");
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "**Sorry But You Dont Have Permission** `MANAGE_GUILD`"
      );
    if (!room) return message.channel.send("Please Type The Channel Name");
    if (!findroom)
      return message.channel.send("Please Type The Log Channel Name");
    let embed = new Discord.RichEmbed()
      .setTitle("**Done The Log Code Has Been Setup**")
      .addField("Channel:", `${room}`)
      .addField("Requested By:", `${message.author}`)
      .setThumbnail(message.author.avatarURL)
      .setFooter(`${client.user.username}`);
    message.channel.sendEmbed(embed);
    log[message.guild.id] = {
      channel: room,
      onoff: "On"
    };
    fs.writeFile("./log.json", JSON.stringify(log), err => {
      if (err) console.error(err);
    });
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "toggleLog")) {
    if (!message.channel.guild)
      return message.reply("**This Command Only For Servers**");
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "**Sorry But You Dont Have Permission** `MANAGE_GUILD`"
      );
    if (!log[message.guild.id])
      log[message.guild.id] = {
        onoff: "Off"
      };
    if (log[message.guild.id].onoff === "Off")
      return [
        message.channel.send(`**The log Is __𝐎𝐍__ !**`),
        (log[message.guild.id].onoff = "On")
      ];
    if (log[message.guild.id].onoff === "On")
      return [
        message.channel.send(`**The log Is __𝐎𝐅𝐅__ !**`),
        (log[message.guild.id].onoff = "Off")
      ];
    fs.writeFile("./log.json", JSON.stringify(log), err => {
      if (err)
        console.error(err).catch(err => {
          console.error(err);
        });
    });
  }
});

client.on("messageDelete", message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (!message.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES"))
    return;
  if (!log[message.guild.id])
    log[message.guild.id] = {
      onoff: "Off"
    };
  if (log[message.guild.id].onoff === "Off") return;
  var logChannel = message.guild.channels.find(
    c => c.name === `${log[message.guild.id].channel}`
  );
  if (!logChannel) return;

  let messageDelete = new Discord.RichEmbed()
    .setTitle("**[MESSAGE DELETE]**")
    .setColor("RED")
    .setThumbnail(message.author.avatarURL)
    .setDescription(
      `**\n**:wastebasket: Successfully \`\`DELETE\`\` **MESSAGE** In ${message.channel}\n\n**Channel:** \`\`${message.channel.name}\`\` (ID: ${message.channel.id})\n**Message ID:** ${message.id}\n**Sent By:** <@${message.author.id}> (ID: ${message.author.id})\n**Message:**\n\`\`\`${message}\`\`\``
    )
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL);

  logChannel.send(messageDelete);
});
client.on("messageUpdate", (oldMessage, newMessage) => {
  if (oldMessage.author.bot) return;
  if (!oldMessage.channel.type === "dm") return;
  if (!oldMessage.guild.member(client.user).hasPermission("EMBED_LINKS"))
    return;
  if (!oldMessage.guild.member(client.user).hasPermission("MANAGE_MESSAGES"))
    return;
  if (!log[oldMessage.guild.id])
    log[oldMessage.guild.id] = {
      onoff: "Off"
    };
  if (log[oldMessage.guild.id].onoff === "Off") return;
  var logChannel = oldMessage.guild.channels.find(
    c => c.name === `${log[oldMessage.guild.id].channel}`
  );
  if (!logChannel) return;

  if (oldMessage.content.startsWith("https://")) return;

  let messageUpdate = new Discord.RichEmbed()
    .setTitle("**[MESSAGE EDIT]**")
    .setThumbnail(oldMessage.author.avatarURL)
    .setColor("BLUE")
    .setDescription(
      `**\n**:wrench: Successfully \`\`EDIT\`\` **MESSAGE** In ${oldMessage.channel}\n\n**Channel:** \`\`${oldMessage.channel.name}\`\` (ID: ${oldMessage.channel.id})\n**Message ID:** ${oldMessage.id}\n**Sent By:** <@${oldMessage.author.id}> (ID: ${oldMessage.author.id})\n\n**Old Message:**\`\`\`${oldMessage}\`\`\`\n**New Message:**\`\`\`${newMessage}\`\`\``
    )
    .setTimestamp()
    .setFooter(oldMessage.guild.name, oldMessage.guild.iconURL);

  logChannel.send(messageUpdate);
});

client.on("roleCreate", role => {
  if (!role.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!role.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
  if (!log[role.guild.id])
    log[role.guild.id] = {
      onoff: "Off"
    };
  if (log[role.guild.id].onoff === "Off") return;
  var logChannel = role.guild.channels.find(
    c => c.name === `${log[role.guild.id].channel}`
  );
  if (!logChannel) return;

  role.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    let roleCreate = new Discord.RichEmbed()
      .setTitle("**[ROLE CREATE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`CREATE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("GREEN")
      .setTimestamp()
      .setFooter(role.guild.name, role.guild.iconURL);

    logChannel.send(roleCreate);
  });
});
client.on("roleDelete", role => {
  if (!role.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!role.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
  if (!log[role.guild.id])
    log[role.guild.id] = {
      onoff: "Off"
    };
  if (log[role.guild.id].onoff === "Off") return;
  var logChannel = role.guild.channels.find(
    c => c.name === `${log[role.guild.id].channel}`
  );
  if (!logChannel) return;

  role.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    let roleDelete = new Discord.RichEmbed()
      .setTitle("**[ROLE DELETE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`DELETE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("RED")
      .setTimestamp()
      .setFooter(role.guild.name, role.guild.iconURL);

    logChannel.send(roleDelete);
  });
});
client.on("roleUpdate", (oldRole, newRole) => {
  if (!oldRole.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!oldRole.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;
  if (!log[oldRole.guild.id])
    log[oldRole.guild.id] = {
      onoff: "Off"
    };
  if (log[oldRole.guild.id].onoff === "Off") return;
  var logChannel = oldRole.guild.channels.find(
    c => c.name === `${log[oldRole.guild.id].channel}`
  );
  if (!logChannel) return;

  oldRole.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (oldRole.name !== newRole.name) {
      if (log[oldRole.guild.id].onoff === "Off") return;
      let roleUpdateName = new Discord.RichEmbed()
        .setTitle("**[ROLE NAME UPDATE]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:white_check_mark: Successfully \`\`EDITED\`\` Role Name.\n\n**Old Name:** \`\`${oldRole.name}\`\`\n**New Name:** \`\`${newRole.name}\`\`\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldRole.guild.name, oldRole.guild.iconURL);

      logChannel.send(roleUpdateName);
    }
    if (oldRole.hexColor !== newRole.hexColor) {
      if (oldRole.hexColor === "#000000") {
        var oldColor = "`Default`";
      } else {
        var oldColor = oldRole.hexColor;
      }
      if (newRole.hexColor === "#000000") {
        var newColor = "`Default`";
      } else {
        var newColor = newRole.hexColor;
      }
      if (log[oldRole.guild.id].onoff === "Off") return;
      let roleUpdateColor = new Discord.RichEmbed()
        .setTitle("**[ROLE COLOR UPDATE]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:white_check_mark: Successfully \`\`EDITED\`\` **${oldRole.name}** Role Color.\n\n**Old Color:** ${oldColor}\n**New Color:** ${newColor}\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldRole.guild.name, oldRole.guild.iconURL);

      logChannel.send(roleUpdateColor);
    }
  });
});

client.on("channelCreate", channel => {
  if (!channel.guild) return;
  if (!channel.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!channel.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;
  if (!log[channel.guild.id])
    log[channel.guild.id] = {
      onoff: "Off"
    };
  if (log[channel.guild.id].onoff === "Off") return;
  var logChannel = channel.guild.channels.find(
    c => c.name === `${log[channel.guild.id].channel}`
  );
  if (!logChannel) return;

  if (channel.type === "text") {
    var roomType = "Text";
  } else if (channel.type === "voice") {
    var roomType = "Voice";
  } else if (channel.type === "category") {
    var roomType = "Category";
  }

  channel.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    let channelCreate = new Discord.RichEmbed()
      .setTitle("**[CHANNEL CREATE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`CREATE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("GREEN")
      .setTimestamp()
      .setFooter(channel.guild.name, channel.guild.iconURL);

    logChannel.send(channelCreate);
  });
});
client.on("channelDelete", channel => {
  if (!channel.guild) return;
  if (!channel.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!channel.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;
  if (!log[channel.guild.id])
    log[channel.guild.id] = {
      onoff: "Off"
    };
  if (log[channel.guild.id].onoff === "Off") return;
  var logChannel = channel.guild.channels.find(
    c => c.name === `${log[channel.guild.id].channel}`
  );
  if (!logChannel) return;

  if (channel.type === "text") {
    var roomType = "Text";
  } else if (channel.type === "voice") {
    var roomType = "Voice";
  } else if (channel.type === "category") {
    var roomType = "Category";
  }

  channel.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    let channelDelete = new Discord.RichEmbed()
      .setTitle("**[CHANNEL DELETE]**")
      .setThumbnail(userAvatar)
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`DELETE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setColor("RED")
      .setTimestamp()
      .setFooter(channel.guild.name, channel.guild.iconURL);

    logChannel.send(channelDelete);
  });
});
client.on("channelUpdate", (oldChannel, newChannel) => {
  if (!oldChannel.guild) return;
  if (!log[oldChannel.guild.id])
    log[oldChannel.guild.id] = {
      onoff: "Off"
    };
  if (log[oldChannel.guild.id].onoff === "Off") return;
  var logChannel = oldChannel.guild.channels.find(
    c => c.name === `${log[oldChannel.guild.id].channel}`
  );
  if (!logChannel) return;

  if (oldChannel.type === "text") {
    var channelType = "Text";
  } else if (oldChannel.type === "voice") {
    var channelType = "Voice";
  } else if (oldChannel.type === "category") {
    var channelType = "Category";
  }

  oldChannel.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (oldChannel.name !== newChannel.name) {
      let newName = new Discord.RichEmbed()
        .setTitle("**[CHANNEL EDIT]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:wrench: Successfully Edited **${channelType}** Channel Name\n\n**Old Name:** \`\`${oldChannel.name}\`\`\n**New Name:** \`\`${newChannel.name}\`\`\n**Channel ID:** ${oldChannel.id}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL);

      logChannel.send(newName);
    }
    if (oldChannel.topic !== newChannel.topic) {
      if (log[oldChannel.guild.id].onoff === "Off") return;
      let newTopic = new Discord.RichEmbed()
        .setTitle("**[CHANNEL EDIT]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:wrench: Successfully Edited **${channelType}** Channel Topic\n\n**Old Topic:**\n\`\`\`${oldChannel.topic ||
            "NULL"}\`\`\`\n**New Topic:**\n\`\`\`${newChannel.topic ||
            "NULL"}\`\`\`\n**Channel:** ${oldChannel} (ID: ${
            oldChannel.id
          })\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL);

      logChannel.send(newTopic);
    }
  });
});

client.on("guildBanAdd", (guild, user) => {
  if (!guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
  if (!log[guild.id])
    log[guild.id] = {
      onoff: "Off"
    };
  if (log[guild.id].onoff === "Off") return;
  var logChannel = guild.channels.find(
    c => c.name === `${log[guild.id].channel}`
  );
  if (!logChannel) return;

  guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (userID === client.user.id) return;

    let banInfo = new Discord.RichEmbed()
      .setTitle("**[BANNED]**")
      .setThumbnail(userAvatar)
      .setColor("DARK_RED")
      .setDescription(
        `**\n**:airplane: Successfully \`\`BANNED\`\` **${user.username}** From the server!\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setTimestamp()
      .setFooter(guild.name, guild.iconURL);

    logChannel.send(banInfo);
  });
});
client.on("guildBanRemove", (guild, user) => {
  if (!guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!guild.member(client.user).hasPermission("VIEW_AUDIT_LOG")) return;
  if (!log[guild.id])
    log[guild.id] = {
      onoff: "Off"
    };
  if (log[guild.id].onoff === "Off") return;
  var logChannel = guild.channels.find(
    c => c.name === `${log[guild.id].channel}`
  );
  if (!logChannel) return;

  guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (userID === client.user.id) return;

    let unBanInfo = new Discord.RichEmbed()
      .setTitle("**[UNBANNED]**")
      .setThumbnail(userAvatar)
      .setColor("GREEN")
      .setDescription(
        `**\n**:unlock: Successfully \`\`UNBANNED\`\` **${user.username}** From the server\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`
      )
      .setTimestamp()
      .setFooter(guild.name, guild.iconURL);

    logChannel.send(unBanInfo);
  });
});

client.on("guildMemberUpdate", (oldMember, newMember) => {
  if (!oldMember.guild) return;
  if (!log[oldMember.guild.id])
    log[oldMember.guild.id] = {
      onoff: "Off"
    };
  if (log[oldMember.guild.id].onoff === "Off") return;
  var logChannel = oldMember.guild.channels.find(
    c => c.name === `${log[(oldMember, newMember.guild.id)].channel}`
  );
  if (!logChannel) return;

  oldMember.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL;
    var userTag = logs.entries.first().executor.tag;

    if (oldMember.nickname !== newMember.nickname) {
      if (oldMember.nickname === null) {
        var oldNM = "`اسمه الاصلي`";
      } else {
        var oldNM = oldMember.nickname;
      }
      if (newMember.nickname === null) {
        var newNM = "`اسمه الاصلي`";
      } else {
        var newNM = newMember.nickname;
      }

      let updateNickname = new Discord.RichEmbed()
        .setTitle("**[UPDATE MEMBER NICKNAME]**")
        .setThumbnail(userAvatar)
        .setColor("BLUE")
        .setDescription(
          `**\n**:spy: Successfully \`\`CHANGE\`\` Member Nickname.\n\n**User:** ${oldMember} (ID: ${oldMember.id})\n**Old Nickname:** ${oldNM}\n**New Nickname:** ${newNM}\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(oldMember.guild.name, oldMember.guild.iconURL);

      logChannel.send(updateNickname);
    }
    if (oldMember.roles.size < newMember.roles.size) {
      let role = newMember.roles
        .filter(r => !oldMember.roles.has(r.id))
        .first();
      if (!log[oldMember.guild.id])
        log[oldMember.guild.id] = {
          onoff: "Off"
        };
      if (log[oldMember.guild.id].onoff === "Off") return;
      let roleAdded = new Discord.RichEmbed()
        .setTitle("**[ADDED ROLE TO MEMBER]**")
        .setThumbnail(oldMember.guild.iconURL)
        .setColor("GREEN")
        .setDescription(
          `**\n**:white_check_mark: Successfully \`\`ADDED\`\` Role to **${oldMember.user.username}**\n\n**User:** <@${oldMember.id}> (ID: ${oldMember.user.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(roleAdded);
    }
    if (oldMember.roles.size > newMember.roles.size) {
      let role = oldMember.roles
        .filter(r => !newMember.roles.has(r.id))
        .first();
      if (!log[oldMember.guild.id])
        log[oldMember.guild.id] = {
          onoff: "Off"
        };
      if (log[(oldMember, newMember.guild.id)].onoff === "Off") return;
      let roleRemoved = new Discord.RichEmbed()
        .setTitle("**[REMOVED ROLE FROM MEMBER]**")
        .setThumbnail(oldMember.guild.iconURL)
        .setColor("RED")
        .setDescription(
          `**\n**:negative_squared_cross_mark: Successfully \`\`REMOVED\`\` Role from **${oldMember.user.username}**\n\n**User:** <@${oldMember.user.id}> (ID: ${oldMember.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(roleRemoved);
    }
  });
  if (oldMember.guild.owner.id !== newMember.guild.owner.id) {
    if (!log[oldMember.guild.id])
      log[oldMember.guild.id] = {
        onoff: "Off"
      };
    if (log[(oldMember, newMember.guild.id)].onoff === "Off") return;
    let newOwner = new Discord.RichEmbed()
      .setTitle("**[UPDATE GUILD OWNER]**")
      .setThumbnail(oldMember.guild.iconURL)
      .setColor("GREEN")
      .setDescription(
        `**\n**:white_check_mark: Successfully \`\`TRANSFER\`\` The Owner Ship.\n\n**Old Owner:** <@${oldMember.user.id}> (ID: ${oldMember.user.id})\n**New Owner:** <@${newMember.user.id}> (ID: ${newMember.user.id})`
      )
      .setTimestamp()
      .setFooter(oldMember.guild.name, oldMember.guild.iconURL);

    logChannel.send(newOwner);
  }
});

client.on("voiceStateUpdate", (voiceOld, voiceNew) => {
  if (!voiceOld.guild.member(client.user).hasPermission("EMBED_LINKS")) return;
  if (!voiceOld.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;
  if (!log[voiceOld.guild.id])
    log[voiceOld.guild.id] = {
      onoff: "Off"
    };
  if (log[(voiceOld, voiceOld.guild.id)].onoff === "Off") return;
  var logChannel = voiceOld.guild.channels.find(
    c => c.name === `${log[(voiceOld, voiceNew.guild.id)].channel}`
  );
  if (!logChannel) return;

  voiceOld.guild.fetchAuditLogs().then(logs => {
    var userID = logs.entries.first().executor.id;
    var userTag = logs.entries.first().executor.tag;
    var userAvatar = logs.entries.first().executor.avatarURL;

    if (voiceOld.serverMute === false && voiceNew.serverMute === true) {
      let serverMutev = new Discord.RichEmbed()
        .setTitle("**[VOICE MUTE]**")
        .setThumbnail(
          "https://images-ext-1.discordapp.net/external/pWQaw076OHwVIFZyeFoLXvweo0T_fDz6U5C9RBlw_fQ/https/cdn.pg.sa/UosmjqDNgS.png"
        )
        .setColor("RED")
        .setDescription(
          `**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(serverMutev);
    }
    if (voiceOld.serverMute === true && voiceNew.serverMute === false) {
      if (!log[voiceOld.guild.id])
        log[voiceOld.guild.id] = {
          onoff: "Off"
        };
      if (log[(voiceOld, voiceOld.guild.id)].onoff === "Off") return;
      let serverUnmutev = new Discord.RichEmbed()
        .setTitle("**[VOICE UNMUTE]**")
        .setThumbnail(
          "https://images-ext-1.discordapp.net/external/u2JNOTOc1IVJGEb1uCKRdQHXIj5-r8aHa3tSap6SjqM/https/cdn.pg.sa/Iy4t8H4T7n.png"
        )
        .setColor("GREEN")
        .setDescription(
          `**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(serverUnmutev);
    }
    if (voiceOld.serverDeaf === false && voiceNew.serverDeaf === true) {
      if (!log[voiceOld.guild.id])
        log[voiceOld.guild.id] = {
          onoff: "Off"
        };
      if (log[(voiceOld, voiceOld.guild.id)].onoff === "Off") return;
      let serverDeafv = new Discord.RichEmbed()
        .setTitle("**[VOICE DEAF]**")
        .setThumbnail(
          "https://images-ext-1.discordapp.net/external/7ENt2ldbD-3L3wRoDBhKHb9FfImkjFxYR6DbLYRjhjA/https/cdn.pg.sa/auWd5b95AV.png"
        )
        .setColor("RED")
        .setDescription(
          `**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(serverDeafv);
    }
    if (voiceOld.serverDeaf === true && voiceNew.serverDeaf === false) {
      if (!log[voiceOld.guild.id])
        log[voiceOld.guild.id] = {
          onoff: "Off"
        };
      if (log[(voiceOld, voiceOld.guild.id)].onoff === "Off") return;
      let serverUndeafv = new Discord.RichEmbed()
        .setTitle("**[VOICE UNDEAF]**")
        .setThumbnail(
          "https://images-ext-2.discordapp.net/external/s_abcfAlNdxl3uYVXnA2evSKBTpU6Ou3oimkejx3fiQ/https/cdn.pg.sa/i7fC8qnbRF.png"
        )
        .setColor("GREEN")
        .setDescription(
          `**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`
        )
        .setTimestamp()
        .setFooter(userTag, userAvatar);

      logChannel.send(serverUndeafv);
    }
  });

  if (
    voiceOld.voiceChannelID !== voiceNew.voiceChannelID &&
    voiceNew.voiceChannel &&
    voiceOld.voiceChannel != null
  ) {
    if (!log[voiceOld.guild.id])
      log[voiceOld.guild.id] = {
        onoff: "Off"
      };
    if (log[(voiceOld, voiceOld.guild.id)].onoff === "Off") return;
    let voiceLeave = new Discord.RichEmbed()
      .setTitle("**[CHANGED VOICE ROOM]**")
      .setColor("GREEN")
      .setThumbnail(voiceOld.user.avatarURL)
      .setDescription(
        `**\n**:repeat: Successfully \`\`CHANGED\`\` The Voice Channel.\n\n**From:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannelID})\n**To:** \`\`${voiceNew.voiceChannel.name}\`\` (ID: ${voiceNew.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`
      )
      .setTimestamp()
      .setFooter(voiceOld.user.tag, voiceOld.user.avatarURL);

    logChannel.send(voiceLeave);
  }
});

///////////////////

///تعديل اساسي
/// كود الرد التلقائي
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on("message", message => {
  if (message.content === "السلام عليكم") {
    message.channel.send("**:heart:وعليكم السلام ورحمة الله وبركاته:heart:**");
    message.channel.sendFile("");
  }
});


client.on("guildCreate", guild => {
  var embed = new Discord.RichEmbed()
    .setColor(0x5500ff)
    .setDescription(`**شكراً لك لإضافه البوت الى سيرفرك 
    Thank You Add Bot to Your Server
    Server Support:https://discord.gg/NacD23K
    WebSite Bot:https://5f8876629af5e.site123.me/
    Bot By <@748065198333755423>**`);
  guild.owner.send(embed);
});



///client.on("message", message => {
  ///if (message.content === "#inv") {
    //message.channel.send("**https://discord.com/api/oauth2/authorize?client_id=768398291725189120&permissions=8&scope=bot**");
    //message.channel.sendFile("Link invite");
  //}
//});

////تعديل غير اساسي
/// كود اختيار لون

client.on("message", message => {
  let args = message.content.split(" ").slice(1);
  if (message.content.split(" ")[0] == prefix + "color") {
    const embedd = new Discord.RichEmbed()
      .setFooter(
        "Requested by " + message.author.username,
        message.author.avatarURL
      )
      .setDescription(`**There's No Color With This Number ** :x: `)
      .setColor(`ff0000`);
    if (!args[0]) return message.channel.sendEmbed(embedd);
    if (isNaN(args[0]))
      return message.channel.sendEmbed(
        embedd.setDescription("Please select a number :x:")
      );
    if (!message.guild.roles.find("name", `${args[0]}`))
      return message.channel.sendEmbed(embedd);

    var a = message.guild.roles.find("name", `${args[0]}`);
    if (!a) return;
    if (a.hasPermission(8))
      return message.channel.send(
        embedd.setDescription("This color has administrator!")
      );
    const embed = new Discord.RichEmbed()

      .setFooter(
        "Requested by " + message.author.username,
        message.author.avatarURL
      )
      .setDescription(`**Color Changed To Successfully** :white_check_mark: `)

      .setColor(`${a.hexColor}`);
    message.channel.sendEmbed(embed);
    if (!args[0]) return;
    setInterval(function() {});
    let count = 0;
    let ecount = 0;
    for (let x = 1; x < 201; x++) {
      message.member.removeRole(message.guild.roles.find("name", `${x}`));
    }
    message.member.addRole(message.guild.roles.find("name", `${args[0]}`));
  }
});

///تعديل اساسي
///لو تبي تعطل كود بدون حذفه حط هذي الرموز

/*
///test
*/

///// كود خروج الاعضاء

client.on("message", message => {
  if (message.content.startsWith(prefix + "setby")) {
    let args = message.mentions.channels.first();
    if (!args)
      message.channel.send("** منشن روم . ❌**").then(m => {
        m.delete(1500);
      });
    if (
      !message.guild.member(message.author.id).hasPermission("MANAGE_CHANNELS")
    )
      return message.channel.send("**ليس لديك صلاحيات . ❌**");
    message.channel.send(
      `**${args}.  | :ballot_box_with_check: |لقد تم شغيل المغادرة هنا**`
    ); 
    client.on("guildMemberAdd", member => {
      if (member.user.bot) return;
      var embed = new Discord.RichEmbed()
        .setAuthor(member.user.username, member.user.avatarURL)
        .setThumbnail(member.user.avatarURL)
        .setTitle(`**الله معاك ✋ **`)
        .addField("**__شكرا لوقتك__**  ", `${member}`)
        .setDescription(`**مع السلامه تشرفنا بك ✋** `)
        .addField("👤   تبقي", `**[ ${member.guild.memberCount} ]**`, true)
        .setColor("RANDOM")
        .setFooter(`نتمنى لكم الاستمتاع`);

      var channel = member.guild.channels.find(gg => gg.name === "log"); //// تعديل اساسي
      if (!channel) return;
      channel.send({ embed: embed });
    });
  }
});

/////كود سرعة البوت او البينق
client.on('message', message =>{
  if(message.content === prefix + 'ping'){
let start = Date.now(); message.channel.send('pong').then(message => { 
message.edit(`\`\`\`js
Time taken: ${Date.now() - start} ms
Discord API: ${client.ping.toFixed(0)} ms\`\`\``);
  });
  }
});


let anti = JSON.parse(fs.readFileSync("./antigrefff.json", "UTF8"));
let config = JSON.parse(fs.readFileSync("./server.json", "UTF8"));
client.on("message", message => {
  if (!message.channel.guild) return;
  let user = anti[message.guild.id + message.author.id];
  let num = message.content
    .split(" ")
    .slice(2)
    .join(" ");
  if (!anti[message.guild.id + message.author.id])
    anti[message.guild.id + message.author.id] = {
      actions: 0
    };
  if (!config[message.guild.id])
    config[message.guild.id] = {
      banLimit: 3,
      chaDelLimit: 3,
      chaCrLimit: 3,
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3,
      time: 30
    };
  if (message.content.startsWith(prefix + "settings")) {
    if (message.author.id !== message.guild.owner.user.id)
      return message.channel.send(
        "**:closed_lock_with_key: لأسباب تتعلق بالحماية تم حصر أوامر الحماية فقط للأونر**"
      );
    if (message.content.startsWith(prefix + "settings limitsban")) {
      if (!num) return message.channel.send("**:1234: | أرسل رقم ! **");
      if (isNaN(num)) return message.channel.send("**:1234: | أرقام فقط ! **");
      config[message.guild.id].banLimit = num;
      message.channel.send(
        `**:lock: | تم التغيير اِلي : ${config[message.guild.id].banLimit} **`
      );
    }
    if (message.content.startsWith(prefix + "settings limitskick")) {
      if (!num) return message.channel.send("**:1234: | أرسل رقم ! **");
      if (isNaN(num)) return message.channel.send("**:1234: | أرقام فقط ! **");
      config[message.guild.id].kickLimits = num;
      message.channel.send(
        `**:lock: | تم التغيير اِلي : ${config[message.guild.id].kickLimits}**`
      );
    }
    if (message.content.startsWith(prefix + "settings limitsroleD")) {
      if (!num) return message.channel.send("**:1234: | أرسل رقم ! **");
      if (isNaN(num)) return message.channel.send("**:1234: | أرقام فقط ! **");
      config[message.guild.id].roleDelLimit = num;
      message.channel.send(
        `**:lock: | تم التغيير اِلي : ${config[message.guild.id].roleDelLimit}**`
      );
    }
    if (message.content.startsWith(prefix + "settings limitsroleC")) {
      if (!num) return message.channel.send("**:1234: | أرسل رقم ! **");
      if (isNaN(num)) return message.channel.send("**:1234: | أرقام فقط ! **");
      config[message.guild.id].roleCrLimits = num;
      message.channel.send(
        `**:lock: | تم التغيير اِلي : ${config[message.guild.id].roleCrLimits}**`
      );
    }
    if (message.content.startsWith(prefix + "settings limitschannelD")) {
      if (!num) return message.channel.send("**:1234: | أرسل رقم ! **");
      if (isNaN(num)) return message.channel.send("**:1234: | أرقام فقط ! **");
      config[message.guild.id].chaDelLimit = num;
      message.channel.send(
        `**:lock: | تم التغيير اِلي : ${config[message.guild.id].chaDelLimit}**`
      );
    }
    if (message.content.startsWith(prefix + "settings limitschannelC")) {
      if (!num) return message.channel.send("**:1234: | أرسل رقم ! **");
      if (isNaN(num)) return message.channel.send("**:1234: | أرقام فقط ! **");
      config[message.guild.id].chaCrLimit = num;
      message.channel.send(
        `**:lock: | تم التغيير اِلي : ${config[message.guild.id].chaCrLimit}**`
      );
    }
    if (message.content.startsWith(prefix + "settings limitstime")) {
      if (!num) return message.channel.send("**:1234: | أرسل رقم ! **");
      if (isNaN(num)) return message.channel.send("**:1234: | أرقام فقط ! **");
      config[message.guild.id].time = num;
      message.channel.send(
        `**:lock: | تم التغيير اِلي : ${config[message.guild.id].time}**`
      );
    }
  }
  fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(e) {
    if (e) throw e;
  });
});
client.on("channelDelete", async channel => {
  const entry1 = await channel.guild
    .fetchAuditLogs({
      type: "CHANNEL_DELETE"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;
  if (!config[channel.guild.id])
    config[channel.guild.id] = {
      banLimit: 3,
      chaDelLimit: 3,
      chaCrLimit: 3,
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3,
      time: 30
    };
  if (!anti[channel.guild.id + entry.id]) {
    anti[channel.guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
  } else {
    anti[channel.guild.id + entry.id].actions = Math.floor(
      anti[channel.guild.id + entry.id].actions + 1
    );
    console.log("TETS");
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
    if (
      anti[channel.guild.id + entry.id].actions >=
      config[channel.guild.id].chaDelLimit
    ) {
      channel.guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          channel.guild.owner.send(
            `**⇏ | ${entry.username} قام بمسح الكثير من الرومات **`
          )
        );
      anti[channel.guild.id + entry.id].actions = "0";
      fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(e) {
    if (e) throw e;
  });
});

client.on("guildMemberAdd", member => {
  member.createDM().then(function (channel) {
  return channel.send(`
:rose:  **ولكم نورت السيرفر**:rose: 
:zap:**انت العضو رقم** ${member.guild.memberCount} :zap:
:crown:**${member}**:crown:`) 
}).catch(console.error)
})


client.on("guildCreate", guild => {
  var embed = new Discord.RichEmbed()
    .setColor(0x5500ff)
    .setDescription(`**شكراً لك لإضافه البوت الى سيرفرك 
    Server Support:https://discord.gg/NacD23K**`);
  guild.owner.send(embed);
});

client.on("channelCreate", async channel => {
  if (!["text", "category", "voice"].includes(channel.type.toLowerCase()))
    return;
  if (!config[channel.guild.id])
    config[channel.guild.id] = {
      banLimit: 3,
      chaDelLimit: 3,
      chaCrLimit: 3,
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3,
      time: 30
    };
  const entry1 = await channel.guild
    .fetchAuditLogs({
      type: "CHANNEL_CREATE"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;

  if (!anti[channel.guild.id + entry.id]) {
    anti[channel.guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
  } else {
    anti[channel.guild.id + entry.id].actions = Math.floor(
      anti[channel.guild.id + entry.id].actions + 1
    );
    console.log("TETS");
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
    if (
      anti[channel.guild.id + entry.id].actions >=
      config[channel.guild.id].chaCrLimit
    ) {
      channel.guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          channel.guild.owner.send(
            `**⇏ | ${entry.username} قام بمسح الكثير من الرومات **`
          )
        );
      anti[channel.guild.id + entry.id].actions = "0";
      fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
    }

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
      if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(
      e
    ) {
      if (e) throw e;
    });
  }
});
client.on("roleDelete", async channel => {
  const entry1 = await channel.guild
    .fetchAuditLogs({
      type: "ROLE_DELETE"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;
  if (!config[channel.guild.id])
    config[channel.guild.id] = {
      banLimit: 3,
      chaDelLimit: 3,
      chaCrLimit: 3,
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3,
      time: 30
    };
  if (!anti[channel.guild.id + entry.id]) {
    anti[channel.guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
  } else {
    anti[channel.guild.id + entry.id].actions = Math.floor(
      anti[channel.guild.id + entry.id].actions + 1
    );
    console.log("TETS");
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
    if (
      anti[channel.guild.id + entry.id].actions >=
      config[channel.guild.id].roleDelLimit
    ) {
      channel.guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          channel.guild.owner.send(
            `**⇏ | ${entry.username} قام بمسح الكثير من الرتب **`
          )
        );
      anti[channel.guild.id + entry.id].actions = "0";
      fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(e) {
    if (e) throw e;
  });
});

client.on("roleCreate", async channel => {
  const entry1 = await channel.guild
    .fetchAuditLogs({
      type: "ROLE_CREATE"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;
  if (!config[channel.guild.id])
    config[channel.guild.id] = {
      banLimit: 3,
      chaDelLimit: 3,
      chaCrLimit: 3,
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3,
      time: 30
    };
  if (!anti[channel.guild.id + entry.id]) {
    anti[channel.guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
  } else {
    anti[channel.guild.id + entry.id].actions = Math.floor(
      anti[channel.guild.id + entry.id].actions + 1
    );
    console.log("TETS");
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
    if (
      anti[channel.guild.id + entry.id].actions >=
      config[channel.guild.id].roleCrLimits
    ) {
      channel.guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          channel.guild.owner.send(
            `**⇏ | ${entry.username} قام بأنشاء الكثير من الرتب **`
          )
        );
      anti[channel.guild.id + entry.id].actions = "0";
      fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(e) {
    if (e) throw e;
  });
});

client.on("guildBanAdd", async (guild, user) => {
  const entry1 = await guild
    .fetchAuditLogs({
      type: "MEMBER_BAN_ADD"
    })
    .then(audit => audit.entries.first());
  console.log("ban: " + entry1.executor.username);
  const entry = entry1.executor;
  if (!config[guild.id])
    config[guild.id] = {
      banLimit: 3,
      chaDelLimit: 3,
      chaCrLimit: 3,
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3,
      time: 30
    };
  if (!anti[guild.id + entry.id]) {
    anti[guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[guild.id + entry.id].actions = 0;
    }, config[guild.id].time * 1000);
  } else {
    anti[guild.id + entry.id].actions = Math.floor(
      anti[guild.id + entry.id].actions + 1
    );
    setTimeout(() => {
      anti[guild.id + entry.id].actions = 0;
    }, config[guild.id].time * 1000);
    if (anti[guild.id + entry.id].actions >= config[guild.id].banLimit) {
      guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          guild.owner.send(`**⇏ | ${entry.username} حاول حظر جميع الأعضاء **`)
        );
      anti[guild.id + entry.id].actions = 0;
      fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(e) {
    if (e) throw e;
  });
});

client.on("guildKickAdd", async (guild, user) => {
  const entry1 = await guild
    .fetchAuditLogs({
      type: "MEMBER_KICK"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;
  if (!config[guild.id])
    config[guild.id] = {
      banLimit: 3,
      chaDelLimit: 3,
      chaCrLimit: 3,
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3,
      time: 30
    };
  if (!anti[guild.id + entry.id]) {
    anti[guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[guild.id + entry.id].actions = 0;
    }, config[guild.id].time * 1000);
  } else {
    anti[guild.id + entry.id].actions = Math.floor(
      anti[guild.id + entry.id].actions + 1
    );
    console.log("TETS");
    setTimeout(() => {
      anti[guild.id + entry.id].actions = 0;
    }, config[guild.id].time * 1000);
    if (anti[guild.id + entry.id].actions >= config[guild.id].banLimit) {
      guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          guild.owner.send(`**⇏ | ${entry.username} حاول حظر جميع الأعضاء **`)
        );
      anti[guild.id + entry.id].actions = 0;
      fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(
        e
      ) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(e) {
    if (e) throw e;
  });
});

client.on("guildMemberRemove", async member => {
  const entry1 = await member.guild
    .fetchAuditLogs()
    .then(audit => audit.entries.first());
  if (entry1.action === "MEMBER_KICK") {
    const entry2 = await member.guild
      .fetchAuditLogs({
        type: "MEMBER_KICK"
      })
      .then(audit => audit.entries.first());
    const entry = entry2.executor;
    if (!config[member.guild.id])
      config[guild.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        chaCrLimit: 3,
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3,
        time: 30
      };
    if (!anti[member.guild.id + entry.id]) {
      anti[member.guild.id + entry.id] = {
        actions: 1
      };
      setTimeout(() => {
        anti[member.guild.id + entry.id].actions = 0;
      }, config[member.guild.id].time * 1000);
    } else {
      anti[member.guild.id + entry.id].actions = Math.floor(
        anti[member.guild.id + entry.id].actions + 1
      );
      console.log("TETS");
      setTimeout(() => {
        anti[member.guild.id + entry.id].actions = 0;
      }, config[member.guild.id].time * 1000 || 30000);
      if (
        anti[member.guild.id + entry.id].actions >=
        config[member.guild.id].kickLimits
      ) {
        member.guild.members
          .get(entry.id)
          .ban()
          .catch(e =>
            member.owner.send(
              `**⇏ | ${entry.username} حاول حظر جميع الأعضاء **`
            )
          );
        anti[member.guild.id + entry.id].actions = 0;
        fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(
          e
        ) {
          if (e) throw e;
        });
        fs.writeFile(
          "./antigreff.json",
          JSON.stringify(anti, null, 2),
          function(e) {
            if (e) throw e;
          }
        );
      }
    }

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), function(e) {
      if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function(
      e
    ) {
      if (e) throw e;
    });
  }
});

var antibots = JSON.parse(fs.readFileSync("./KickBots.json", "utf8"));
let saveSteve = () => {
  fs.writeFileSync(
    "./KickBots.json",
    JSON.stringify(antibots, null, 2),
    err => {
      if (err) throw err;
    }
  );
};
client.on("message", message => {
  if (!message.guild) return;
  if (!antibots[message.guild.id])
    config[message.guild.id] = {
      onoff: true
    };
  if (message.content.startsWith(prefix + "antibots on")) {
    if (message.author.bot || !message.channel.guild) return;
    if (message.author.id !== message.guild.owner.user.id)
      return message.channel.send(
        "**:closed_lock_with_key: لأسباب تتعلق بالحماية تم حصر أوامر الحماية فقط للأونر**"
      );
    antibots[message.guild.id] = {
      onoff: true
    };
    saveSteve();
    message.channel.send("**AntiBots Join Is On :closed_lock_with_key: **");
  }
  if (message.content.startsWith(prefix + "antibots off")) {
    if (message.author.bot || !message.channel.guild) return;
    if (message.author.id !== message.guild.owner.user.id)
      return message.channel.send(
        "**:closed_lock_with_key: لأسباب تتعلق بالحماية تم حصر أوامر الحماية فقط للأونر**"
      );
    antibots[message.guild.id] = {
      onoff: false
    };
    saveSteve();
    message.channel.send("**AntiBots Join Is Off :unlock: **");
  }
  saveSteve();
});

client.on("guildMemberAdd", member => {
  if (!antibots[member.guild.id])
    config[member.guild.id] = {
      onoff: true
    };
  if (antibots[member.guild.id].onoff == false) return;
  if (member.user.bot) return member.ban("Protection from Bots.");
  saveSteve();
});

client.on("message", async message => {
  const moment = require("moment"); //npm i moment
  const ms = require("ms"); //npm i ms
  // var prefix = '' //Bot Prefix !
  var time = moment().format("Do MMMM YYYY , hh:mm");
  var room;
  var title;
  var duration;
  var currentTime = new Date(),
    hours = currentTime.getHours() + 3,
    minutes = currentTime.getMinutes(),
    done = currentTime.getMinutes() + duration,
    seconds = currentTime.getSeconds();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  var suffix = "AM";
  if (hours >= 12) {
    suffix = "PM";
    hours = hours - 12;
  }
  if (hours == 0) {
    hours = 12;
  }

  var filter = m => m.author.id === message.author.id;
  if (message.content.startsWith(prefix + "gcreate")) {
    let embed1 = new Discord.RichEmbed()
      .setColor()
      .setDescription("Missing the following permission `MANAGE_GUILD`");

    let embed2 = new Discord.RichEmbed()
      .setColor()
      .setDescription("Please send the `room` name without mentioning it");

    let embed3 = new Discord.RichEmbed()
      .setColor()
      .setDescription("Wrong room name");

    let embed4 = new Discord.RichEmbed()
      .setColor()
      .setDescription("Please send the `time`");

    let embed5 = new Discord.RichEmbed()
      .setColor()
      .setDescription(
        "Wrong time format\nExample of time format: 1s / 1m / 1h / 1d / 1w"
      );

    let embed6 = new Discord.RichEmbed()
      .setColor()
      .setDescription("Please send the `gift`");

    if (!message.guild.member(message.author).hasPermission("MANAGE_GUILD"))
      return message.channel.send(embed1);
    message.channel.send(embed2).then(msg => {
      message.channel
        .awaitMessages(filter, {
          max: 1,
          time: 20000,
          errors: ["time"]
        })
        .then(collected => {
          let room = message.guild.channels.find(
            gg => gg.name === collected.first().content
          );
          if (!room) return message.channel.send(embed3);
          room = collected.first().content;
          collected.first().delete();
          msg.edit(embed4).then(msg => {
            message.channel
              .awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ["time"]
              })
              .then(collected => {
                if (!collected.first().content.match(/[1-60][s,m,h,d,w]/g))
                  return message.channel.send(embed5);
                duration = collected.first().content;
                collected.first().delete();
                msg.edit(embed6).then(msg => {
                  message.channel
                    .awaitMessages(filter, {
                      max: 1,
                      time: 20000,
                      errors: ["time"]
                    })
                    .then(collected => {
                      title = collected.first().content;
                      collected.first().delete();
                      msg.delete();
                      message.delete();
                      try {
                        let giveEmbed = new Discord.RichEmbed()
                          .setColor()
                          .setTitle(`${title}`)
                          .setDescription(
                            `React With 🎉 To Enter! \nTime remaining : ${duration} \n **Created at :** ${hours}:${minutes}:${seconds} ${suffix}`
                          );
                        //.setFooter(message.author.username, message.author.avatarURL);
                        message.guild.channels
                          .find(gg => gg.name === room)
                          .send(" :tada: **Giveaway** :tada:", {
                            embed: giveEmbed
                          })
                          .then(m => {
                            let re = m.react("🎉");
                            setTimeout(() => {
                              let users = m.reactions.get("🎉").users;
                              let list = users
                                .array()
                                .filter(
                                  u => (u.id !== m.author.id) !== client.user.id
                                );
                              let gFilter =
                                list[
                                  Math.floor(Math.random() * list.length) + 1
                                ];
                              if (gFilter === undefined) {
                                let endEmbed = new Discord.RichEmbed()
                                  .setColor()
                                  .setTitle(title)
                                  .setDescription(
                                    `Winners : no enough number of reaction so there is no winner`
                                  )
                                  .setFooter("Ended at :")
                                  .setTimestamp();
                                m.edit("** 🎉 GIVEAWAY ENDED 🎉**", {
                                  embed: endEmbed
                                });
                              } else {
                                let endEmbed = new Discord.RichEmbed()
                                  .setColor()
                                  .setTitle(title)
                                  .setDescription(`Winners : ${gFilter}`)
                                  .setFooter("Ended at :")
                                  .setTimestamp();
                                m.edit("** 🎉 GIVEAWAY ENDED 🎉**", {
                                  embed: endEmbed
                                });
                              }
                              if (gFilter === undefined) {
                                // message.guild.channels.find("name" , room).send("No enough number of reactions")
                              } else {
                                message.guild.channels
                                  .find(gg => gg.name === room)
                                  .send(
                                    `**Congratulations ${gFilter}! You won The \`${title}\`**`
                                  );
                              }
                            }, ms(duration));
                          });
                      } catch (e) {
                        message.channel.send(
                          `:heavy_multiplication_x:| **i Don't Have Prem**`
                        );
                        console.log(e);
                      }
                    });
                });
              });
          });
        });
    });
  }
});

///كود حذف الروابط
/// تعديل اساسي حذف روابط الديسكورد
client.on("message", message => {
  if (message.content.includes("discord.gg/")) {
    if (message.member.hasPermission("ADMINISTRATOR")) return;
    message.delete();
    message.guild
      .member(message.author)
      .addRole(message.guild.roles.find(r => r.name === "Muted"));
    let embedP = new Discord.RichEmbed()
      .setTitle("? | تمت معاقبتك")
      .setAuthor(message.author.username, message.author.avatarURL)
      .addField(
        `** لقد قمت بمخالفة قوانين السيرفر من خلال نشر روابط اضافة الى سيرفرات اخرى  **`,
        `**ملاحظة  : إن كآن هذآ الاسكات عن طريق الخطأ الرجاء التوجه والتكلم مع الادآرة**`
      )
      
      .setColor("RED")
      .setThumbnail(message.author.avatarURL)
      .setFooter(`${message.guild.name} Server`, message.guild.iconURL);

    message.channel.send(embedP);
  }
});



client.on("message", message => {
  if (message.content.includes("http://")) {
    if (message.member.hasPermission("ADMINISTRATOR")) return;
    message.delete();
    message.guild
      .member(message.author)
      .addRole(message.guild.roles.find(r => r.name === "Muted"));
    let embedP = new Discord.RichEmbed()
      .setTitle("? | تمت معاقبتك")
      .setAuthor(message.author.username, message.author.avatarURL)
      .addField(
        `** لقد قمت بمخالفة قوانين السيرفر من خلال نشر روابط اضافة الى سيرفرات اخرى  **`,
        `**ملاحظة  : إن كآن هذآ الاسكات عن طريق الخطأ الرجاء التوجه والتكلم مع الادآرة**`
      )
      
      .setColor("RED")
      .setThumbnail(message.author.avatarURL)
      .setFooter(`${message.guild.name} Server`, message.guild.iconURL);

    message.channel.send(embedP);
  }
});


client.on("message", message => {
  if (message.content.includes(".com")) {
    if (message.member.hasPermission("ADMINISTRATOR")) return;
    message.delete();
    message.guild
      .member(message.author)
      .addRole(message.guild.roles.find(r => r.name === "Muted"));
    let embedP = new Discord.RichEmbed()
      .setTitle("? | تمت معاقبتك")
      .setAuthor(message.author.username, message.author.avatarURL)
      .addField(
        `** لقد قمت بمخالفة قوانين السيرفر من خلال نشر روابط اضافة الى سيرفرات اخرى  **`,
        `**ملاحظة  : إن كآن هذآ الاسكات عن طريق الخطأ الرجاء التوجه والتكلم مع الادآرة**`
      )
      
      .setColor("RED")
      .setThumbnail(message.author.avatarURL)
      .setFooter(`${message.guild.name} Server`, message.guild.iconURL);

    message.channel.send(embedP);
  }
});

client.on("message", message => {
  if (message.content.includes(".net")) {
    if (message.member.hasPermission("ADMINISTRATOR")) return;
    message.delete();
    message.guild
      .member(message.author)
      .addRole(message.guild.roles.find(r => r.name === "Muted"));
    let embedP = new Discord.RichEmbed()
      .setTitle("? | تمت معاقبتك")
      .setAuthor(message.author.username, message.author.avatarURL)
      .addField(
        `** لقد قمت بمخالفة قوانين السيرفر من خلال نشر روابط اضافة الى سيرفرات اخرى  **`,
        `**ملاحظة  : إن كآن هذآ الاسكات عن طريق الخطأ الرجاء التوجه والتكلم مع الادآرة**`
      )
      .setColor("RED")
      .setThumbnail(message.author.avatarURL)
      .setFooter(`${message.guild.name} Server`, message.guild.iconURL);

    message.channel.send(embedP);
  }
});


const replyMSG = JSON.parse(fs.readFileSync("./replyMSG.json", "utf8"));

function saveReplay() {
  fs.writeFile("./replyMSG.json", JSON.stringify(replyMSG), function(err) {
    if (err) throw err;
  });
}

/////كود صنع رد تلقائي
client.on("message", async message => {
  if (message.content.startsWith(prefix + "reply")) {
    if (message.author.bot || message.channel.type == "dm") return undefined;
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    if (!replyMSG[message.author.id])
      replyMSG[message.author.id] = {
        contentmessage: "none",
        replayMessage: "none"
      };
    saveReplay();
    let contmessage;

    let filter = m => m.author.id === message.author.id;
    message.channel.send(" |** من فضلك اكتب الرساله الان...** ").then(msg => {
      message.channel
        .awaitMessages(filter, {
          //R.I.P Royal Bot!
          maxMatches: 1,
          time: 12000,
          errors: ["time"]
        })

        .then(collected => {
          contmessage = collected.first().content;
          msg.edit(":scroll: | من فضلك اكتب الرد الان... :pencil2: ");

          message.channel
            .awaitMessages(filter, {
              maxMatches: 1,
              time: 12000,
              errors: ["time"]
            })

            .then(async collectedd => {
              replyMSG[message.author.id] = {
                contentmessage: contmessage,
                replayMessage: collectedd.first().content
              };
              saveReplay();
              var embed1 = new Discord.RichEmbed()
                .setTitle(`Done The Autoreply Setup`)
                .setThumbnail(message.author.avatarURL)
                .setColor("GRAY")
                .setDescription(
                  `
                    Message:
                    ${contmessage}
                    Reply:
                    ${collectedd.first().content}`
                );
              let steve = await client.fetchUser("359541019836022784");
              embed1.setFooter(
                `رد تلقائي`,
                steve ? steve.displayAvatarURL : message.author.displayAvatarURL
              );
              msg.edit("  |** تم الاعداد بنجاح...**");

              message.channel.send(embed1);
            });
        });
    });
  }
});

client.on("message", message => {
  if (
    !replyMSG[message.author.id] ||
    !replyMSG[message.author.id].contentmessage ||
    !replyMSG[message.author.id].replayMessage
  )
    return;
  let messagecontent = replyMSG[message.author.id].contentmessage;
  let reply = replyMSG[message.author.id].replayMessage;
  if (message.content == messagecontent) {
    if (messagecontent == "none" || reply == "none") return undefined;
    message.channel.send(`\`#\` ${reply}`);
  }
});

/////كود كريدت

const credits = JSON.parse(fs.readFileSync("./credits.json"));
var time = require("./time.json");
client.on("message", async message => {
  if (message.author.bot || message.channel.type === "dm") return;
  let args = message.content.split(" ");
  let author = message.author.id;
  if (!credits[author])
    credits[author] = {
      credits: 0
    };
  fs.writeFileSync("./credits.json", JSON.stringify(credits, null, 4));
  if (args[0].toLowerCase() == `${prefix}credits`) {
    const mention = message.mentions.users.first() || message.author;
    const mentionn = message.mentions.users.first();
    if (!args[2]) {
      message.channel.send(
        `**${mention.username}, your :credit_card: balance is \`$${credits[mention.id].credits}\`**`
      );
    } else if (mentionn && args[2]) {
      if (isNaN(args[2]) || [",", "."].includes(args[2]))
        return message.channel.send(`**:x: | Error**`);

      if (args[2] < 1) return message.channel.send(`**:x: | Error**`);
      if (mention.bot) return message.channel.send(`**:x: | Error**`);
      if (mentionn.id === message.author.id)
        return message.channel.send(`**:x: | Error**`);
      if (args[2] > credits[author].credits)
        return message.channel.send(
          `**:x: | Error , You Don't Have Enough Credit**`
        );
      if (args[2].includes("-")) return message.channel.send(`**:x: | Error**`);
      let resulting =
        parseInt(args[2]) == 1
          ? parseInt(args[2])
          : Math.floor(args[2] - args[2] * (5 / 100));
      let tax =
        parseInt(args[2]) == 1
          ? parseInt(args[2])
          : Math.floor(args[2] * (5 / 100));
      let first = Math.floor(Math.random() * 9);
      let second = Math.floor(Math.random() * 9);
      let third = Math.floor(Math.random() * 9);
      let fourth = Math.floor(Math.random() * 9);
      let num = `${first}${second}${third}${fourth}`;
      let Canvas = require("canvas");
      let canvas = Canvas.createCanvas(108, 40);
      let ctx = canvas.getContext("2d");
      const background = await Canvas.loadImage(
        "https://cdn.discordapp.com/attachments/608278049091223552/617791172810899456/hmmm.png"
      );
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.font = "20px Arial Bold";
      ctx.fontSize = "20px";
      ctx.fillStyle = "#ffffff";
      message.channel
        .send(
          `**${
            message.author.username
          }, Transfer Fees: \`${tax}\`, Amount: \`$${resulting.toLocaleString()}\`**
type these numbers to confirm: `
        )
        .then(async essss => {
          message.channel.send(`\`${num}\``).then(m => {
            message.channel
              .awaitMessages(r => r.author.id === message.author.id, {
                max: 1,
                time: 20000,
                errors: ["time"]
              })
              .then(collected => {
                if (collected.first().content === num) {
                  essss.delete()
                  message.channel.send(
                    `**:moneybag: | ${
                      message.author.username
                    }, Done Trans \`$${resulting.toLocaleString()}\` To ${mentionn}**`
                  );
                  mention.send(
                    `**:money_with_wings: | Transfer Receipt **\`\`\`You Have Received \`$${resulting.toLocaleString()}\` From User ${
                      message.author.username
                    }; (ID (${message.author.id})\`\`\``
                  );
                  m.delete();
                  credits[author].credits += Math.floor(
                    -resulting.toLocaleString()
                  );
                  credits[mentionn.id].credits += Math.floor(
                    +resulting.toLocaleString()
                  );
                  fs.writeFileSync(
                    "./credits.json",
                    JSON.stringify(credits, null, 4)
                  );
                } else {
                  m.delete();
                  essss.delete();
                }
              });
          });
        });
    } else {
      message.channel.send(
        `**:x: | Error , Please Command True Ex: \`${prefix}credits [MentionUser] [Balance]\`**`
      );
    }
  }
  if (args[0].toLowerCase() === `${prefix}daily`) {
    let cooldown = 8.64e7;
    let Daily = time[message.author.id];
    if (Daily !== null && cooldown - (Date.now() - Daily) > 0) {
      let times = cooldown - (Date.now() - Daily);
      message.channel.send(
        `**:stopwatch: |  ${
          message.author.username
        }, your daily :dollar: credits refreshes in ${pretty(times, {
          verbose: true
        })}.**`
      );
      fs.writeFile("./time.json", JSON.stringify(time), function(e) {
        if (e) throw e;
      });
    } else {
      let ammount = (300, 500, 100, 200, 120, 150, 350, 320, 220, 250);
      credits[author].credits += ammount;
      time[message.author.id] = Date.now();
      message.channel.send(
        `**:atm:  | ${message.author.username}, you received your :yen: ${ammount} daily credits!**`
      );
      fs.writeFile("./credits.json", JSON.stringify(credits), function(e) {
        if (e) throw e;
      });
    }
  }
}); //

client.on("message", async message => {
  let Fire = message.content.split(" ")[0].substring(prefix.length);
  let mention = message.mentions.users.first() || message.author;
  if (Fire === "addcredits") {
    let args = message.content.split(" ");
    if (!devs.includes(message.author.id)) return;
    if (!args[1] || isNaN(args[1])) return message.reply("**Type Credit**");
    if (!credits[mention.id]) return;
    credits[mention.id].credits += +args[1];
    fs.writeFileSync("./credits.json", JSON.stringify(credits));
    console.log(credits[mention.id]);
    message.reply(`** Adedd Money For : \`${args[1]}\` Done **`);
  } else if (Fire === "removecredits") {
    let args = message.content.split(" ");
    if (!devs.includes(message.author.id)) return;
    if (!args[1] || isNaN(args[1])) return message.reply("**Type Credit**");
    if (!credits[mention.id]) return;
    credits[mention.id].credits += -args[1];
    fs.writeFileSync("./credits.json", JSON.stringify(credits));
    console.log(credits[mention.id]);
    message.reply(`**, Remove Money For : \`${args[1]}\`**`);
  }
});

const { Canvas } = require("canvas-constructor");
const { Attachment } = require("discord.js");
const { resolve, join } = require("path");
const fetch = require("node-fetch");
const prettySeconds = require("pretty-seconds");
const fsn = require("fs-nextra");

const welcome = JSON.parse(fs.readFileSync("./welcomer.json", "utf8")); //ملف تخزين كود الويلكم

//كود الويلكم

client.on("guildMemberAdd", async member => {
  if (!welcome) return;
  if (!welcome[member.guild.id]) return;
  var findingWlcChannel = welcome[member.guild.id]
    ? welcome[member.guild.id].channel
    : "null";
  const channel = await member.guild.channels.find(
    r => r.name == findingWlcChannel
  );
  if (!channel) return;
  if (channel) {
    const imageUrlRegex = /\?size=2048$/g; ///تعديل غير اساسي
    const wlcImage = await fsn.readFile("./welcome111.png"); //اسم الصورة
    let result = await fetch(
      member.user.displayAvatarURL.replace(imageUrlRegex, "?size=128")
    );
    if (!result.ok) throw new Error("Failed to get the avatar!");
    let avatar = await result.buffer();

    let name =
      member.user.username.length > 12
        ? member.user.username.substring(0, 11) + "..."
        : member.user.username;

    // تعديل غير اساسي : هنا خيارات الصورة لو تبى تغيرها

    //Welcome Image (background)
    var imageWidth = 500; //عرض الصورة
    var imageHeight = 266; //ارتفاع الصورة

    //Avatar
    var imageX = 250; //X coordinate
    var imageY = 145; //Y coordinate
    var imageRadius = 110; //نصف قطر الصورة الدائرية

    //Member Name
    var nameSize = "12pt"; //حجم خط الاسم
    var nameKind = "Source Sans Pro (OT1)"; //نوع خط الاسم
    var nameColor = "#ff9933"; //لون خط الاسم

    //Name Position
    var nameX = 247; //position x
    var nameY = 275; //position y

    let buffer = await new Canvas(500, 300)
      .addImage(wlcImage, 0, 0, imageWidth, imageHeight)
      .addCircularImage(avatar, imageX, imageY, imageRadius)
      .setTextAlign("center")
      .setTextFont(`${nameSize} ${nameKind}`)
      .setColor(nameColor)
      .addText(name, nameX, nameY)
      .toBuffer();
    const filename = `Baron-wlc-${member.id}.jpg`;
    const attachment = new Attachment(buffer, filename);
    await channel.send(attachment);
  }
});

//تحديد روم الويلكم
const wait = require("util").promisify(setTimeout);
client.on("ready", async () => {
  wait(1000);

  await client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});
var gg2;

client.on("guildMemberAdd", async member => {
  if (!welcome[member.guild.id])
    welcome[member.guild.id] = {
      by: "Off",
      channel: null
    };

  if (welcome[member.guild.id].by === "Off") return;
  let channel = member.guild.channels.find(
    c => c.name == welcome[member.guild.id].channel
  );
  if (!channel) return;

  await member.guild.fetchInvites().then(async guildInvites => {
    const ei = await invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = await guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const inviter1 = await invite.inviter;
    const inviter =
      (await client.users.get(invite.inviter.id)) ||
      client.users.get(member.guild.owner.user.id);
    const logChannel = member.guild.channels.find(
      channel => channel.name === `${welcome[member.guild.id].channel}`
    );
    if (!logChannel) return console.log("I can't find welcomeChannel");
    let gg1 = await welcome[member.guild.id].msg.replace(
      "[member]",
      `<@!${member.id}>`
    );
    if (!inviter1 || !inviter1.id) {
      gg2 = await gg1.replace("[inviter]", `<@${member.guild.ownerID}>`);
    } else {
      gg2 = await gg1.replace("[inviter]", `<@${inviter1.id}>`);
    }
    setTimeout(() => {
      logChannel.send(`${gg2}`);
    }, 2000);
    fs.writeFile("./welcome.json", JSON.stringify(welcome), err => {
      if (err)
        console.error(err).catch(err => {
          console.error(err);
        });
    });
  });
});
client.on("message", async message => {
  if (!message.channel.guild) return;
  let room = message.content.split(" ").slice(1);
  let findroom = message.guild.channels.find(r => r.name == room);
  if (message.content.startsWith(prefix + "setWelcomer")) {
    if (!welcome[message.guild.id]) {
      if (!message.channel.guild)
        return message.reply("**This Command Only For Servers**");
      if (!message.member.hasPermission("MANAGE_GUILD"))
        return message.channel.send(
          "**Sorry But You Dont Have Permission** `MANAGE_GUILD`"
        );
      if (!room) return message.channel.send("Please Type The Channel Name");
      if (!findroom) return message.channel.send("Cant Find This Channel");
      let embed = new Discord.RichEmbed()
        .setTitle("**Done The Welcome Has Been Setup**")
        .addField("Channel:", `${room}`)
        .addField("Requested By:", `${message.author}`)
        .addField(
          "Default Message:",
          `**Welcome [member], You Joined by [inviter] invite**`
        )
        .setThumbnail(message.author.avatarURL)
        .setFooter(`${client.user.username}`);
      message.channel.sendEmbed(embed);
      welcome[message.guild.id] = {
        channel: room,
        onoff: "On",
        by: "On",
        msg: `**Welcome [member], You Joined by [inviter] invite**`
      };
      fs.writeFile("./welcomer.json", JSON.stringify(welcome), err => {
        if (err) console.error(err);
      });
    } else if (welcome[message.guild.id].channel) {
      let msg = await welcome[message.guild.id].msg;
      let by = await welcome[message.guild.id].by;
      if (!message.channel.guild)
        return message.reply("**This Command Only For Servers**");
      if (!message.member.hasPermission("MANAGE_GUILD"))
        return message.channel.send(
          "**Sorry But You Dont Have Permission** `MANAGE_GUILD`"
        );
      if (!room) return message.channel.send("Please Type The Channel Name");
      if (!findroom) return message.channel.send("Cant Find This Channel");
      let embed = new Discord.RichEmbed()
        .setTitle("**Done The Welcome Has Been Setup**")
        .addField("Channel:", `${room}`)
        .addField("Requested By:", `${message.author}`)
        .addField("Default Message:", msg)
        .setThumbnail(message.author.avatarURL)
        .setFooter(`${client.user.username}`);
      message.channel.sendEmbed(embed);
      welcome[message.guild.id] = {
        channel: room,
        onoff: "On",
        by: by,
        msg: msg
      };
      fs.writeFile("./welcomer.json", JSON.stringify(welcome), err => {
        if (err) console.error(err);
      });
    }
  }
});

client.on("message", async message => {
  let messageArray = message.content.split(" ");
  if (message.content.startsWith(prefix + "setMessage")) {
    if (!welcome[message.guild.id] || !welcome[message.guild.id].onoff == "On")
      return message.channel.send(
        `**please type \`${prefix}setWelcomer\` first **`
      );
    let filter = m => m.author.id === message.author.id;
    let thisMessage;
    let thisFalse;
    let room = welcome[message.guild.id].channel;
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send("You don't have permission").then(msg => {
        msg.delete(4500);
        message.delete(4500);
      });

    message.channel
      .send(
        `**من فضلك اكتب رسالة الترحيب الان:
لعمل منشن للعضو او الشخص الذى قام بدعوتة
Ex : 
\`[member] Joined the server by [inviter]\`**`
      )
      .then(msg => {
        message.channel
          .awaitMessages(filter, {
            max: 1,
            time: 90000,
            errors: ["time"]
          })
          .then(collected => {
            collected.first().delete();
            thisMessage = collected.first().content;
            msg.edit("**تم الاعداد بنجاح**").then(msg => {
              let embed = new Discord.RichEmbed()
                .setTitle("**Done The Welcome Msg Has Been Setup**")
                .addField("Message:", `${thisMessage}`)
                .setThumbnail(message.author.avatarURL)
                .setFooter(`${client.user.username}`);
              message.channel.sendEmbed(embed);
              welcome[message.guild.id] = {
                channel: room,
                onoff: "On",
                by: "On",
                msg: thisMessage
              };
              fs.writeFile("./welcomer.json", JSON.stringify(welcome), err => {
                if (err) console.error(err);
              });
            });
          });
      });
  }
});

///كود منشن بوتات

client.on("message", message => {
  if (message.content === prefix + "ls") {
    var list_all = [];
    message.guild.members.forEach(bb => {
      if (!bb.user.bot) return;
      list_all.push(`<@${bb.user.id}>`);
    });
    message.channel.send(list_all.join(", "));
  }
});

////كود رابط
////تعديل غير اساسي

client.on("message", message => {
  if (message.content.split(" ")[0] === prefix + "رابط") {
    message.channel
      .createInvite({
        thing: true,
        maxUses: 5,
        maxAge: 86400
      })
      .then(invite => message.author.send(invite.url));
    const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(
        "** تم ارسال الرابط على الخاص ، اذا لم يصلك افتح الخاص  **"
      )
      .setAuthor(client.user.username, client.user.avatarURL)
      .setAuthor(client.user.username, client.user.avatarURL)
      .setFooter("طلب بواسطة: " + message.author.tag);

    message.channel.sendEmbed(embed).then(message => {
      message.delete(10000);
    });
    const Embed11 = new Discord.RichEmbed().setColor("RANDOM")
      .setDescription(`** مدة الرابط : يوم 
 عدد استخدامات الرابط : 5 **`);

    message.author.sendEmbed(Embed11);
  }
});

////لايحتاج تعديل
////كود الفويس اونلاين

let vojson = JSON.parse(fs.readFileSync("vojson.json", "utf8")); // ملف تخزين الفويس اونلاين
client.on("message", message => {
  if (message.content.startsWith(prefix + "setVc")) {
    let channel = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "**ADMINISTRATOR ليس لديك صلاحية :rolling_eyes: ** "
      );
    let channelfind = message.guild.channels.find(c => c.name == channel);
    if (!channel)
      return message.channel.send(
        "Please Type The Voice Channel Name Example: " +
          `${prefix}setVc <Channel name>`
      );
    if (!channelfind)
      return message.channel.send(`I can't find this channel \`${channel}\``);
    vojson[message.guild.id] = {
      stats: "enable",
      chid: channelfind.id,
      guild: message.guild.id
    };
    channelfind.setName(
      `Voice Online : ${message.guild.members.filter(m => m.voiceChannel).size}` ///تعديل غير اساسي تعديل اسم روم الفويس اونلاين
    );
    message.channel.send("**Done The Voice Online  Is Turned On**");
  }
  if (message.content.startsWith(prefix + "vc off")) {
    // ايقاف الفويس اونلاين
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "ADMINISTRATOR ليس لديك صلاحية :rolling_eyes:"
      );

    message.guild.channels
      .find(gg => gg.name === vojson[message.guild.id].chid)
      .delete();
    vojson[message.guild.id] = {
      stats: "disable",
      chid: "undefined",
      guild: message.guild.id
    };
    message.channel.send("**Done The Voice Online Is Turned Off**");
  }
  fs.writeFile("./vojson.json", JSON.stringify(vojson), err => {
    if (err) console.error(err);
  });
});

client.on("voiceStateUpdate", (oldMember, newMember) => {
  if (!vojson[oldMember.guild.id])
    vojson[oldMember.guild.id] = {
      stats: "disable",
      chid: "undefined",
      guild: "undefined"
    };
  if (vojson[oldMember.guild.id].stats === "enable") {
    let ch = vojson[oldMember.guild.id].chid;
    let channel = oldMember.guild.channels.get(ch);
    if (!channel) return;
    let guildid = vojson[oldMember.guild.id].guild;
    channel.setName(
      `Voice Online : ${
        oldMember.guild.members.filter(m => m.voiceChannel).size
      }` ///تعديل غير اساسي تغير اسم روم الفويس اونلاين
    );
  }
  if (vojson[oldMember.guild.id].stats === "disable") {
    return;
  }
});

client.on("ready", () => {
  console.log("hi");
});

////تعديل غير اساسي

client.on("message", message => {
  if (message.content.startsWith(prefix + "تقديم")) {
    if (!message.channel.guild) return;
    if (message.author.bot) return;
    let channel = message.guild.channels.find(gg => gg.name === "التقديمات");
    if (!channel)
      return message.reply(
        "**لانشاء روم التقديمات ${prefix}room1 من فضلك اكتب الامر**"
      );
    if (channel) {
      message.channel.send(message.member + ", **:timer:**").then(m => {
        m.edit(message.member + ", **اسمك الحقيقى  ✍**");
        m.channel
          .awaitMessages(m1 => m1.author == message.author, {
            maxMatches: 1,
            time: 60 * 1000
          })
          .then(m1 => {
            m1 = m1.first();
            var name = m1.content;
            m1.delete();
            m.edit(message.member + ", **:timer:**").then(m => {
              m.edit(message.member + ", **كم عمرك 🎓**");
              setTimeout(() => {
                m.delete();
              }, 10000);
              m.channel
                .awaitMessages(m2 => m2.author == message.author, {
                  maxMatches: 1,
                  time: 60 * 1000
                })
                .then(m2 => {
                  m2 = m2.first();
                  var age = m2.content;
                  m2.delete();
                  message.channel
                    .send(message.member + ", **:timer:**")
                    .then(m => {
                      m.edit(message.member + ", **هل تتفاعل في الرتبه🎙**");
                      setTimeout(() => {
                        m.delete();
                      }, 10000);
                      m.channel
                        .awaitMessages(m1 => m1.author == message.author, {
                          maxMatches: 1,
                          time: 60 * 1000
                        })
                        .then(m3 => {
                          m3 = m3.first();
                          var ask = m3.content;
                          m3.delete();
                          message.channel
                            .send(message.member + ", **:timer:**")
                            .then(m => {
                              m.edit(
                                message.member + ", **هل ستحترم القوانين ؟ 📑**"
                              );
                              setTimeout(() => {
                                m.delete();
                              }, 10000);
                              m.channel
                                .awaitMessages(
                                  m1 => m1.author == message.author,
                                  { maxMatches: 1, time: 60 * 1000 }
                                )
                                .then(m4 => {
                                  m4 = m4.first();
                                  var ask2 = m4.content;
                                  m4.delete();
                                  message.channel
                                    .send(message.member + ", **:timer:**")
                                    .then(m => {
                                      m.edit(
                                        message.member +
                                          ", **لماذا يجب علينا ان نقبلك ؟ وما هي الرتبه التي تريدها 🤔**"
                                      );
                                      m.channel
                                        .awaitMessages(
                                          m1 => m1.author == message.author,
                                          { maxMatches: 1, time: 60 * 1000 }
                                        )
                                        .then(m5 => {
                                          m5 = m5.first();
                                          var ask3 = m5.content;
                                          m5.delete();
                                          m.edit(
                                            message.member +
                                              ", **....جارى جمع البيانات**"
                                          ).then(mtime => {
                                            setTimeout(() => {
                                              let embed = new Discord.RichEmbed()
                                                .setColor("RANDOM")
                                                .setTitle(
                                                  `**تقديم على رتبه** [__**${message.guild.name}**__]`
                                                )
                                                .addField(
                                                  "**`الاسم`**",
                                                  `${name}`,
                                                  true
                                                )
                                                .addField(
                                                  "**`العمر`**",
                                                  `${age}`,
                                                  true
                                                )
                                                .addField(
                                                  "**`هل سوف يتفاعل ؟`**",
                                                  `${ask}`
                                                )
                                                .addField(
                                                  "**`هل سوف يحترم القوانين ؟`**",
                                                  `${ask2}`
                                                )
                                                .addField(
                                                  "**`لماذا يجب علينا قبوله|وماهى الرتبه اللتي يريدها`**",
                                                  `${ask3}`
                                                )
                                                .setFooter(
                                                  `Name : ${message.author.username}\nID User : ${message.author.id}`,
                                                  "https://images-ext-2.discordapp.net/external/JpyzxW2wMRG2874gSTdNTpC_q9AHl8x8V4SMmtRtlVk/https/orcid.org/sites/default/files/files/ID_symbol_B-W_128x128.gif"
                                                );
                                              channel.send(embed);
                                            }, 2500);
                                            setTimeout(() => {
                                              mtime.delete();
                                            }, 3000);
                                          });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
          });
      });
    }
  }
});

client.on("message", message => {
  if (message.content.startsWith(prefix + "room1")) {
    if (!message.channel.guild) return;
    if (message.author.bot) return;
    if (!message.member.hasPermission("`MANAGE_CHANNELS"))
      return message.reply("**تحتاج الى `MANAGE_CHANNELS`**");
    message.guild.createChannel("التقديمات", "text").then(c => {
      c.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
      });
    });
    message.channel.send("**✅ تم انشاء روم التقديمات بنجاح**");
  }
});

client.on("message", message => {
  var args = message.content.split(" ").slice(1);
  var msg = message.content.toLowerCase();
  if (!message.guild) return;
  if (!msg.startsWith(prefix + "role")) return;
  if (!message.member.hasPermission("MANAGE_ROLES"))
    return message.channel.send(" **ليس لديك صلاحيات :rolling_eyes:**");
  if (msg.toLowerCase().startsWith(prefix + "rerole")) {
    if (!args[0])
      return message.reply("**:x: يرجى وضع الشخص المراد سحب منه الرتبة**");
    if (!args[1])
      return message.reply("**:x: يرجى وضع الرتبة المراد سحبها من الشخص**");
    var role = msg
      .split(" ")
      .slice(2)
      .join(" ")
      .toLowerCase();
    var role1 = message.guild.roles
      .filter(r => r.name.toLowerCase().indexOf(role) > -1)
      .first();
    if (!role1)
      return message.reply("**:x: يرجى وضع الرتبة المراد سحبها من الشخص**");
    if (message.mentions.members.first()) {
      if (role1.position >= message.member.highestRole.position)
        return message.channel.send(
          " اانت لا تمتلك الصلاحيات الكافية :rolling_eyes:"
        );

      message.mentions.members.first().removeRole(role1);
      return message.reply(
        "**:white_check_mark: [ " +
          role1.name +
          " ] رتبة [ " +
          args[0] +
          " ] تم سحب من **"
      );
    }
    if (args[0].toLowerCase() == "all") {
      if (role1.position >= message.member.highestRole.position)
        return message.channel.send(
          "انت لا تمتلك الصلاحيات الكافية :rolling_eyes:"
        );

      message.guild.members.forEach(m => m.removeRole(role1));
      return message.reply(
        "**:white_check_mark: [ " + role1.name + " ] تم سحب من الكل رتبة**"
      );
    } else if (args[0].toLowerCase() == "bots") {
      if (role1.position >= message.member.highestRole.position)
        return message.channel.send(
          "انت لا تمتلك الصلاحيات الكافية :rolling_eyes:"
        );

      message.guild.members
        .filter(m => m.user.bot)
        .forEach(m => m.removeRole(role1));
      return message.reply(
        "**:white_check_mark: [ " + role1.name + " ] تم سحب من البوتات رتبة**"
      );
    } else if (args[0].toLowerCase() == "humans") {
      if (role1.position >= message.member.highestRole.position)
        return message.channel.send(
          "انت لا تمتلك الصلاحيات الكافية :rolling_eyes:"
        );

      message.guild.members
        .filter(m => !m.user.bot)
        .forEach(m => m.removeRole(role1));
      return message.reply(
        "**:white_check_mark: [ " + role1.name + " ] تم سحب من البشريين رتبة**"
      );
    }
  } else {
    if (!args[0])
      return message.reply("**:x: يرجى وضع الشخص المراد اعطائها الرتبة**");
    if (!args[1])
      return message.reply("**:x: يرجى وضع الرتبة المراد اعطائها للشخص**");
    var role = msg
      .split(" ")
      .slice(2)
      .join(" ")
      .toLowerCase();
    var role1 = message.guild.roles
      .filter(r => r.name.toLowerCase().indexOf(role) > -1)
      .first();
    if (!role1)
      return message.reply("**:x: يرجى وضع الرتبة المراد اعطائها للشخص**");
    if (message.mentions.members.first()) {
      if (role1.position >= message.member.highestRole.position)
        return message.channel.send(
          "انت لا تمتلك الصلاحيات الكافية :rolling_eyes:"
        );

      message.mentions.members.first().addRole(role1);
      return message.reply(
        "**:white_check_mark: [ " +
          role1.name +
          " ] رتبة [ " +
          args[0] +
          " ] تم اعطاء **"
      );
    }
    if (args[0].toLowerCase() == "all") {
      if (role1.position >= message.member.highestRole.position)
        return message.channel.send(
          "انت لا تمتلك الصلاحيات الكافية :rolling_eyes:"
        );
      message.guild.members.forEach(m => m.addRole(role1));
      return message.reply(
        "**:white_check_mark: [ " + role1.name + " ] تم اعطاء الكل رتبة**"
      );
    } else if (args[0].toLowerCase() == "bots") {
      if (role1.position >= message.member.highestRole.position)
        return message.channel.send(
          "انت لا تمتلك الصلاحيات الكافية :rolling_eyes:"
        );

      message.guild.members
        .filter(m => m.user.bot)
        .forEach(m => m.addRole(role1));
      return message.reply(
        "**:white_check_mark: [ " + role1.name + " ] تم اعطاء البوتات رتبة**"
      );
    } else if (args[0].toLowerCase() == "humans") {
      if (role1.position >= message.member.highestRole.position)
        return message.channel.send(
          "انت لا تمتلك الصلاحيات الكافية :rolling_eyes:"
        );

      message.guild.members
        .filter(m => !m.user.bot)
        .forEach(m => m.addRole(role1));
      return message.reply(
        "**:white_check_mark: [ " + role1.name + " ] تم اعطاء البشريين رتبة**"
      );
    }
  }
});

client.on("message", async message => {
  if (!message.guild) return;
  let mention = message.mentions.members.first();
  let role = message.content
    .split(" ")
    .slice(2)
    .join(" ");
  let mySupport = message.guild.roles.find(gg => gg.name === role);
  if (message.content.startsWith(prefix + "قبول")) {
    let acRoom = message.guild.channels.find(gg => gg.name === "القبول-الرفض");
    if (!acRoom)
      return message.reply(
        `${prefix}room2 من فضلك انشاء روم **القبول-الرفض** او اكتب الامر`
      );
    if (acRoom) {
      if (!message.guild.member(message.author).hasPermission("MANAGE_ROLES"))
        return;
      if (!mention) return message.reply("منشن شخص");
      if (!role) return message.reply("ادخل اسم رتبة");
      if (!mySupport) return message.reply("هذه الرتبة غير موجودة");
      if (mention.roles.has(mySupport))
        return message.reply("هذا الشخص معه الرتبة مسبقا");
      if (mySupport.position >= message.member.highestRole.position)
        return message.channel.send(
          "انت لا تمتلك الصلاحيات الكافية :rolling_eyes:"
        );

      mention.addRole(mySupport).then(() => {
        acRoom.send(
          `**[ ${mySupport} ] واعطائك رتبة ${mention} تم قبولك بنجاح**`
        );
      });
    }
  }
});

client.on("message", async message => {
  if (message.content.startsWith(prefix + "رفض")) {
    if (!message.channel.guild) return;

    let mention = message.mentions.members.first();
    let acRoom = message.guild.channels.find("name", "القبول-الرفض");
    let rrrr = message.content.split(/ +/).slice(2);
    let reason = rrrr.join(" ");
    if (!acRoom)
      return message.reply(
        `${prefix}room2 من فضلك انشاء روم **القبول-الرفض** او اكتب الامر`
      );
    if (!message.guild.member(message.author).hasPermission("MANAGE_ROLES"))
      return;
    if (!mention) return message.reply("منشن شخص");
    message.react("✅");
    acRoom
      .send(
        `**${mention} تم رفضك للأسف **
السبب : \`${reason}\``
      )
      .then(m => m.react("✅"));
  }
});
client.on("message", message => {
  if (message.content.startsWith(prefix + "room2")) {
    if (!message.channel.guild) return;
    if (message.author.bot) return;
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.reply("**تحتاج الى `MANAGE_CHANNELS`**");
    message.guild.createChannel("القبول-الرفض", "text").then(c => {
      c.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
      });
    });
    message.channel.send("**✅ تم انشاء روم القبول والرفض بنجاح**");
  }
});
client.on("message", async msg => {
  if (msg.author.bot) return undefined;
  if (!msg.content.startsWith(prefix)) return undefined;

  let args = msg.content.split(" ");

  let command = msg.content.toLowerCase().split(" ")[0];
  command = command.slice(prefix.length);

  if (command === `avatar`) {
    if (msg.channel.type === "dm")
      return msg.channel.send(
        "Nope Nope!! u can't use avatar command in DMs (:"
      );
    let mentions = msg.mentions.members.first();
    if (!mentions) {
      let sicon = msg.author.avatarURL;
      let embed = new Discord.RichEmbed()
        .setImage(msg.author.avatarURL)
        .setColor("#5074b3");
      msg.channel.send({ embed });
    } else {
      let sicon = mentions.user.avatarURL;
      let embed = new Discord.RichEmbed().setColor("#5074b3").setImage(sicon);
      msg.channel.send({ embed });
    }
  }
});

//// تغير غير اساسي
///// كود ميوزك

