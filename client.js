const logger = require("@turkerssh/logger");
const config = require("./config.js");
const {
  Client,
  GatewayIntentBits,
  Partials,
  ActivityType,
} = require("discord.js");

const intents = Object.values(GatewayIntentBits);
const partials = Object.values(Partials);

const client = new Client({ intents, partials });

client.once("ready", () => {
  logger.info({
    type: "ready",
    message: `Logged in as ${client.user.tag}`,
  });

  client.user.setActivity({
    type: ActivityType.Custom,
    name: config.Activity.State,
  });
});

client.login(config.BotToken);

const getMember = (guildId, memberId) => {
  const guild = client.guilds.cache.get(guildId);
  return guild ? guild.members.cache.get(memberId) : null;
};

client.on("guildMemberRemove", (member) => {
  if (member.guild.id !== config.Servers.MainGuildId) return;

  const secondServerMember = getMember(config.Servers.SecondGuildId, member.id);
  if (secondServerMember) {
    secondServerMember.kick({ reason: "Left main guild" });
    logger.info({
      type: "guildMemberRemove",
      message: `Kicked ${member.user.tag} from second server`,
    });
  }
});

client.on("guildMemberAdd", (member) => {
  if (member.guild.id !== config.Servers.SecondGuildId) return;

  const mainMember = getMember(config.Servers.MainGuildId, member.id);
  if (!mainMember) {
    member.kick({ reason: "Not in main guild" });
    logger.info({
      type: "guildMemberAdd",
      message: `Kicked ${member.user.tag} from second server`,
    });
  }
});

client.on("guildMemberUpdate", async (oldMember, newMember) => {
  if (newMember.guild.id !== config.Servers.SecondGuildId) return;

  const mainMember = getMember(config.Servers.MainGuildId, newMember.id);
  if (!mainMember) {
    await newMember.kick({ reason: "Not in main guild" });
    logger.info({
      type: "guildMemberUpdate",
      message: `Kicked ${newMember.user.tag} from second server`,
    });
  }
});

process.on("unhandledRejection", (error) => {
  logger.error({
    type: "unhandledRejection",
    message: error,
  });
});
process.on("uncaughtException", (error) => {
  logger.error({
    type: "uncaughtException",
    message: error,
  });
});
