////////////////////////////////////////
// isgame-online-lambda
//
// Copyright (c) 2017 Jonathan Hardison
// /games/playstation/index.js
///////////////////////////////////////

var request = require("request");
var cheerio = require("cheerio");
var gameStatus = require('../../models/gamestatus');

var config = require('../../config');
let configInstance = new config();

var realGameName = "playstation";

function CheckGameStatus(callback){

        request({uri: "https://status.playstation.com/data/statuses/region/SCEA.json"}, function(error, response, body) {
            if(error){
                callback(null);
            }
            
            try{
                
                var $ = cheerio.load(body);           

                var holdStatusStringUnparsed = point1.children().eq(0).text();

                if(holdStatusStringUnparsed === "Up and Running"){
                    holdStatusStringUnparsed = "Online"; //fixup to online for return matchin.
                }
                var statusResponse = new gameStatus(holdStatusStringUnparsed, null, realGameName);

                if(configInstance.debugEnabled){
                     console.log("Hold Status: " + holdStatusStringUnparsed);
                     //console.log("Maint Status: " + holdMaintenanceStringUnparsed);
                     console.log("Response Object" + statusResponse);
                }

                callback(statusResponse);
            }
            catch(errorUnhandled){
                throw errorUnhandled;
            }
        });        
}

module.exports = CheckGameStatus;