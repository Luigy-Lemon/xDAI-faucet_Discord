const mongoose = require('mongoose');
// Schema

const UserSchema = new mongoose.Schema({
	discordId: { type : String , unique : true, required : true, dropDups: true },
    eth_address: {type:String},
    hasReceivedFromFaucet: Boolean,
    isAdmin:Boolean,
    isMod:Boolean,
});

module.exports = mongoose.model('User', UserSchema);
