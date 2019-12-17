const config = {
  SLACK_TOKEN: process.env.SLACK_TOKEN
};

module.exports = key => {
  if (!key) return config;

  return config[key];
};
