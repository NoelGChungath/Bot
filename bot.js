const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
client.login("Nzk5Nzk4MzE1Mjg0NjkzMDMy.YAI0OQ.w9W3kqRvyWgLI1rvInNV0ZwRVDI");
const express = require("express");

//Getting input.json file using fs
let orgData = JSON.parse(fs.readFileSync("lang.json"));

let app = express();
let port = process.env.PORT || 3000;
let server = app.listen(port, () => console.log("Listening")); //listening in port 3000

app.use(express.static("Public")); //setting webhost files

client.on("ready", () => {
  console.log("Ready");
});

client.on("message", (message) => {
  // Prefix
  console.log(message.content.indexOf("!"));
  let prefix = "!";
  let exit = null;
  for (let i = 0; i < orgData.length; i++) {
    if (message.content === prefix + orgData[i].input) {
      message.reply(orgData[i].output);
      exit == true;
      break;
    }
  }
  if (exit == false) {
    message.reply(
      "This phrase does not exist. If you want to add this phrase please vist https://tharavadubot.glitch.me/  "
    );
  }
});

app.get("/add/:input/:output", (req, resp) => {
  const params = req.params;
  const input = params.input;
  const output = params.output;
  orgData = JSON.parse(fs.readFileSync("lang.json"));
  orgData.push({ input, output });
  fs.writeFileSync("lang.json", JSON.stringify(orgData, null, 2));
  resp.send({ succesful: "successful" });
});
