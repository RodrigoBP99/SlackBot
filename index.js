const SlackBot = require("slackbots");
const axios = require("axios");
const config = require("./config");

const bot = new SlackBot({
  token: config("SLACK_TOKEN"),
  name: "jarvis"
});

//start handler
bot.on("start", () => {
  //bot.postMessageToChannel("froopy-land", "Olá, humanos!");
});

//erro
bot.on("error", err => console.log(err));

//mensagem
bot.on("message", data => {
  if (data.type !== "message") {
    return;
  }
  console.log(data);

  handleMessage(data.text);
});

// trata mensagem
function handleMessage(message) {
  if (message.includes(" joke")) {
    randomJoke();
  } else if (message.includes(" ola")) {
    bot.postMessageToChannel(
      "froopy-land",
      "Olá. Quer que eu te conte uma piada?"
    );
  } else if (message.includes(" noob")) {
    bot.postMessageToChannel("froopy-land", "Noob é você!");
  } else if (message.includes("ajuda")) {
    runHelp();
  }
}

//Chuck Norris joke;
function chuckjoke() {
  axios.get("http://api.icndb.com/jokes/random").then(res => {
    const joke = res.data.value.joke;

    console.log(joke);

    bot.postMessageToChannel("froopy-land", `${joke}`);
  });
}

//Yo momma Joke
function yoMommajoke() {
  axios.get("https://api.yomomma.info/").then(res => {
    const joke = res.data.joke;

    console.log(joke);

    bot.postMessageToChannel("froopy-land", `${joke}`);
  });
}

// piada aleatoria
function randomJoke() {
  const rand = Math.floor(Math.random() * 2) + 1;
  if (rand === 1) {
    chuckjoke();
  } else if (rand === 2) {
    yoMommajoke();
  }
}

//ajuda do bot
function runHelp() {
  console.log("ajuda");
  bot.postMessageToChannel(
    "froopy-land",
    "Digite @jarvis 'joke', para eu te contar uma piada!"
  );
}
