var request = require("request");
var cheerio = require("cheerio");
var net = require("net");

var realGameName = "secret world legends";


function CheckGameStatus(callback){

    
    var holdStatusStringUnparsed = "Offline";
    var statusResponse;
    try{
        const client = net.createConnection({port: 8000, host: "public.universe.robertsspaceindustries.com"}, () => {
            //'connect' listener
            //console.log('connected to server!');
            client.write('isgame.online test poll');
            holdStatusStringUnparsed = "Online";
            statusResponse = new gameStatus(holdStatusStringUnparsed, null, realGameName);
            callback(statusResponse);
        });

        client.on('error',function(err){
            if(err.code=="ECONNREFUSED"){
                //console.log("econnrefused");
                holdStatusStringUnparsed = "Offline";
            }
            else if(err.code=="ENOTFOUND"){
                //console.log("enotfound");
                holdStatusStringUnparsed = "Offline";
            }
            else{
                console.log("all other failures");
                holdStatusStringUnparsed = "Offline";
            }
            statusResponse = new gameStatus(holdStatusStringUnparsed, null, realGameName);
            client.end();
            callback(statusResponse);
        });

        
        
    }
    catch(errorUnhandled){
        throw errorUnhandled;
    }
    


        
//ECONNREFUSED
//ENOTFOUND 
       
        // request({uri: "http://msgs.ageofconan.com/patchnotes.php?UniverseName=SWLLive&Language=en"}, function(error, response, body) {
        //     if(error){
        //         callback(null);
        //     }
            
        //     try{
                
        //         var $ = cheerio.load(body);

        //         var point1 = $('font');
        //         var point2 = $('b');

        //         var holdStatusStringUnparsed = point1.children().eq(1).text();
        //         var holdMaintenanceStringUnparsed = point2.children().eq(1).text();

                


        //              console.log("Hold Status: " + holdStatusStringUnparsed);
        //              console.log("Maint Status: " + holdMaintenanceStringUnparsed);



        //     }
        //     catch(errorUnhandled){
        //         throw errorUnhandled;
        //     }
        // });        
}

CheckGameStatus();