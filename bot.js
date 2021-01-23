const Discord = require("discord.js");
const MicroSpellingCorrecter = require("micro-spelling-correcter");
const discordcoins = require("discord-coins");
const fetch = require("node-fetch");
require("dotenv").config();
const client = new Discord.Client();
client.login(process.env.TOKEN);

client.on("ready", () => {
  console.log("Ready");
});

let correcter = new MicroSpellingCorrecter(
  [
    // list of target words
    "!help",
    "!gif",
    "!wikpedia",
  ],
  100 // target maximum distance, defaults to 2
);

client.on("message", async (message) => {
  console.log(message.content);
  const tokens = message.content.split(" ");
  let searchQuery = "";

  if (tokens.length > 1) {
    searchQuery = tokens.slice(1, tokens.length).join(" ");
  }

  if (tokens[0] == "!gif") {
    const response = await fetch(
      `https://api.tenor.com/v1/search?q=${searchQuery}&key=${process.env.TENORKEY}&limit=15`
    );
    const jsonResponse = await response.json();
    const index = Math.floor(Math.random() * jsonResponse.results.length);

    message.channel.send(jsonResponse.results[index].url);
  } else if (tokens[0] == "!wikpedia") {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${searchQuery}`
    );
    const jsonResponse = await response.json();
    const filteredData = Object.values(jsonResponse.query.pages)[0]
      .extract.split(".")
      .slice(0, 10)
      .join(" ");
    console.log(filteredData);
    message.channel.send(filteredData);
  } else if (tokens[0] == "!help") {
    const embed = new Discord.MessageEmbed()
      .setColor("#ff652f")
      .setTitle("Command List")
      .addField(":camera: Gif", "!gif <arg>", true)
      .addField("📚 Wikpedia", "!wikpedia <arg>", true)
      .setTimestamp();

    message.channel.send(embed);
  } else if (tokens[0] == "!bal") {
    let Balance = discordcoins.Balance(message.author.id);
    message.channel.send(`${message.author.username} balance is ${Balance}!`);
  } else if (message.content === `!add`) {
    let Add = discordcoins.Add(message.author.id, 100); //100 is the amount you want to add.
    message.channel.send(Add);
  } else if (message.content === `!sub`) {
    let Add = discordcoins.Add(message.author.id, 100); //100 is the amount you want to add.
    message.channel.send(Add);
  }

  const correctSpelling = correcter.correct(tokens[0]);

  if (correctSpelling.includes(tokens[0]) == false) {
    const embed = new Discord.MessageEmbed()
      .setColor("#ff652f")
      .setTitle("Missing Arguments(s)")
      .addField("The correct syntax is:", `${correctSpelling} <arg>`, true)
      .setTimestamp();

    message.channel.send(embed);
  }

  // if (correctSpelling.includes(tokens[0]) == false) {
  //   console.log("ff");
  //   // const embed = new Discord.MessageEmbed()
  //   //   .setColor("#ff652f")
  //   //   .setTitle("Missing Arguments(s)")
  //   //   .addField("The correct syntax is:")
  //   //   .addField(correctSpelling);

  //   // message.channel.send(embed);
  // }
});
