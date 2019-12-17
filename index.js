const SlackBot = require("slackbots");
const axios = require("axios");

const bot = new SlackBot({
  token: config.SLACK_API_TOKEN,
  name: "jarvis"
});

//start handler
bot.on("start", () => {
  const params = {
    icon_emoji: ":computer:"
  };

  //bot.postMessageToChannel("froopy-land", "Olá, humanos!", params);
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

function handleMessage(message) {
  const params = {
    icon_emoji: ":computer:"
  };
  if (message.includes("ola")) {
    bot.postMessageToChannel(
      "froopy-land",
      "Olá. Quer que eu te conte uma piada?",
      params
    );
    return;
  }

  if (message.includes("joke" | "piada")) {
    joke();
    return;
  }

  if (message.includes("noob")) {
    bot.postMessageToChannel("froopy-land", "Noob é você!", params);
    return;
  }
}

joke;
function joke() {
  axios.get("http://api.icndb.com/jokes/random").then(res => {
    const joke = res.data.value.joke;

    console.log(res.data);
    const params = {
      icon_emoji: ":laughing:"
    };

    bot.postMessageToChannel("froopy-land", `Joke: ${joke}`, params);
  });
}
