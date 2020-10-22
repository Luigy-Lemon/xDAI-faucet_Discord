
/*  SETUP */

const { error, exception } = require('console');
const { Error } = require('mongoose');
const { sendDropTo } = require('./commands/faucet.js');

const path = require('path'),
    dotenv = require('dotenv').config(),
    db = require("./db/connection.js"),
    Discord = require("discord.js"),
    faucet = require("./commands/faucet.js"),
    middleware = require("./middlewares/discord.js");


const client = new Discord.Client();
const prefix = "$$";

client.on("message", function (message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();


    if (command === "ping") {
        message.reply(`Pong!`);
        return
    }
    else if (command === "faucet") {
        if (args[0] && args[0].length === 42 && args[0].slice(0, 2) === "0x") {

            middleware.hasReceivedDrop(message.author, args[0]).then(
                res => {
                    if (res.hasReceivedFromFaucet) {
                        message.reply(`You already used the faucet`);
                        return
                    }
                    sendDrop()
                }
            )

            function sendDrop() {
                middleware.dropPending(message.author).then(
                        message.reply(`Sending...`)
                )
                faucet.sendDropTo(args[0]).then(obj => {
                    if (obj["hash"]) {
                        message.reply(`xDAI sent to ${args[0]} \nhttp://blockscout.com/poa/xdai/tx/${obj["hash"]}`)
                    }
                    else {

                        throw error
                    };
                }).catch(error => {
                    message.reply(`there was an error`)
                    middleware.hasReceivedDrop(message.author, args[0])
                    return
                })
            }
        }

        else { message.reply(`Input the address correctly`); return }
    }

    else if (command === "balance") {
        faucet.getBalance().then(balance => {
            console.log(balance)
            balance = balance.slice(0, 4)
            message.reply(`The faucet has: ${balance} xDAI`)
            return
        }
        )

    }

    else if (command === "help")
        message.reply('Faucet cmd -> `$$faucet [address]`');
	
	else {
		message.reply('use $help');
	}

});

client.login(process.env.BOT_TOKEN);


