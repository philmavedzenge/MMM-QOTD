/* Magic Mirror
 * Module: MMM-QOTD
 *
 * By PHILMAVEDZENGE
 *
 */
const NodeHelper = require('node_helper');
const request = require('request');
var data;
const siteUrl = "https://branham.org/en/QuoteOfTheDay";
const axios = require("axios");
const cheerio = require('cheerio');
const Entities = require('html-entities').AllHtmlEntities;
var os = require("os");


module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting node_helper for: " + this.name);
        //getQuote();
    },

    getQuote: async function(){
        console.log("inside getQuote ");
        const entities = new Entities();
        const fetchData = async () => {
          const result = await axios.get(siteUrl);
          return cheerio.load(result.data);
        };

        const $ = await fetchData();
        var scripture = $("#scripturereference").html();
        var scriptureText = $("#scripturetext").html();
        scriptureText = scriptureText.replace(/(<([^>]+)>)/ig,"");

        var messageDate= $("#title").html();
        var messageTitle= unescape($("#summary").html());
        messageTitle = messageTitle.replace(/(<([^>]+)>)/ig,"");

        var messageText= entities.decode($("#content").html());
        messageText = messageText.split("<br>").join(os.EOL);
        messageText = messageText.replace(/(<([^>]+)>)/ig,"");

        data = {scripture:scripture,scriptureText:scriptureText,messageDate:messageDate,messageTitle:messageTitle,messageText:messageText};
        //data = JSON.stringify(data);
        console.log(data.messageText);
        this.sendSocketNotification('QUOTE_RESULT', data);
    },

    socketNotificationReceived: function(notification) {
        if (notification === 'GET_QUOTE') {
            this.getQuote();
        }
    }
});
