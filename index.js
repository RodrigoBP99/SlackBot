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
bot.on("error", err => console.log(`Erro: ${err}`));

//mensagem
bot.on("message", messageData => {
  if (messageData.type !== "message") {
    return;
  }
  console.log(messageData);

  handleMessage(messageData);
});

// trata mensagem
function handleMessage(messageData) {
  if (messageData.text.includes(" joke")) {
    randomJoke(messageData);
  } else if (messageData.text.includes(" ola")) {
    bot.postMessage(
      `${messageData.channel}`,
      "Olá. Quer que eu te conte uma piada?"
    );
  } else if (messageData.text.includes(" noob")) {
    bot.postMessage(`${messageData.channel}`, "Noob é você!");
  } else if (messageData.text.includes(" help")) {
    runHelp(messageData);
  } else if (messageData.text.includes("me inspire")) {
    inspireMe(messageData);
  }
}

//Chuck Norris joke;
function chuckjoke(messageData) {
  axios.get("http://api.icndb.com/jokes/random").then(res => {
    const joke = res.data.value.joke;

    console.log(joke);

    bot.postMessageToChannel(`${messageData.channel}`, `${joke}`);
  });
}

//Yo momma Joke
function yoMommajoke(messageData) {
  axios.get("https://api.yomomma.info/").then(res => {
    const joke = res.data.joke;

    console.log(joke);

    bot.postMessage(`${messageData.channel}`, `${joke}`);
  });
}

// piada aleatoria
function randomJoke(messageData) {
  const rand = Math.floor(Math.random() * 2);
  if (rand === 0) {
    chuckjoke(messageData);
  } else if (rand === 1) {
    yoMommajoke(messageData);
  }
}

//ajuda do bot
function runHelp(messageData) {
  console.log("ajuda");
  bot.postMessage(
    `${messageData.channel}`,
    "Digite @jarvis 'joke', para eu te contar uma piada.\nOu digite @jarvis 'me inspire' para eu te falar uma frase motivacional!"
  );
}

// me inspire
function inspireMe(messageData) {
  axios
    .get(
      "https://raw.githubusercontent.com/BolajiAyodeji/inspireNuggets/master/src/quotes.json"
    )
    .then(res => {
      const quotes = res.data;
      const random = Math.floor(Math.random() * quotes.length);
      const quote = quotes[random].quote;
      const author = quotes[random].author;

      console.log(`${quote} - *${author}*`);

      bot.postMessage(`${messageData.channel}`, `${quote} - *${author}*`);
    });
}

var http = require("http");
setInterval(function() {
  http.get("http://jarvis2lack8ot.herokuapp.com");
}, 3000);
