
const { findOrCreate, findOneAndUpdate } = require("../utilities/db.js");

async function hasReceivedDrop(profile, eth_address) {
  let res = await findOrCreate("User", { discordId: profile.id }, {
    discordId: profile.id,
    eth_address: eth_address,
  })
    .catch(function (err) {
      return err;
    });
  return res
}

async function dropPending(profile) {
  findOneAndUpdate("User", { discordId: profile.id }, {
    hasReceivedFromFaucet: true,
  })
}


async function dropFailed(profile) {
  findOneAndUpdate("User", { discordId: profile.id }, {
    hasReceivedFromFaucet: false,
  })
}



module.exports = { hasReceivedDrop , dropFailed, dropPending}