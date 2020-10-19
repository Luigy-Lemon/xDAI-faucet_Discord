const { findOrCreate, findOneAndUpdate } = require("../utilities/db.js");
const fetch = require("node-fetch")
const ObjectId = require('mongoose').Types.ObjectId;
const dotenv = require('dotenv').config();

const apiKey = process.env.FAUCET_KEY


async function getBalance() {
  try {
    let res = await fetch("https://xdai-faucet.top/api/api-info", {
      method: 'get',
      headers: {'X-API-KEY': apiKey },
    })
    let json = await res.json()
    console.log(json)
    return json["balance"]
  }
  catch (error) {
    console.log(error);
  }
}


async function sendDropTo(address) {
  try {
    let res = await fetch(`https://xdai-faucet.top/api/faucet/${address}`, {
      method: 'get',
      headers: { 'Accept': "application/json", 'Accept-Encoding': 'gzip', 'X-API-KEY': apiKey },
    })
    let json = await res.json()
    console.log(json)
    return json
  }
  catch (error) {
    console.log(error);
  }
}






module.exports = {
  getBalance,
  sendDropTo
};
