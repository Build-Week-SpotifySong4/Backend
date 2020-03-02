require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const axios = require("axios");

function generateToken(user) {
  const payload = {
    userid: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, jwtSecret, options);
}

async function getSpotifyAuth() {
  try {
    const res = await axios({
      url: "https://accounts.spotify.com/api/token",
      method: "post",
      headers: { Authorization: process.env.SPOTIFY_SECRET },
      params: {
        grant_type: "client_credentials"
      }
    });

    return res.data.access_token;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { generateToken, getSpotifyAuth };
