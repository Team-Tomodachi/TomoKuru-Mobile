require("dotenv").config();

module.exports = {
  name: "TomoKuru",
  version: "1.0.0",
  extra: {
    fbApiKey: process.env.FB_APIKEY,
    fbAuthDomain: process.env.FB_AUTHDOMAIN,
    fbProjectId: process.env.FB_PROJECTID,
    fbStorageBucket: process.env.FB_STORAGEBUCKET,
    fbMessagingSenderId: process.env.FB_MESSAGINGSENDERID,
    fbAppId: process.env.FB_APPID,
    apiURL: process.env.API_URL,
  },
};
