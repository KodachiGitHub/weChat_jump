/**
 * Created by JK on 2018/1/1.
 */

let http = require("http");
let url  = require("url");
let path = require('path');
let fs   = require("fs");
let querystring = require('querystring');
let execSync = require('child_process').execSync;

let server = http.createServer(function (request, response) {
    let param = querystring.parse(url.parse(request.url).query);
    let pressTime = parseInt(param.pressTime);
    if(pressTime !== -1){
        console.log('adb shell input swipe 320 410 320 410 ' + pressTime);
        execSync('adb shell input swipe 320 410 320 410 ' + pressTime);
    }

    setTimeout(function(){
        execSync('adb shell screencap -p /sdcard/jump.png');
        execSync('adb pull /sdcard/jump.png .');
        fs.exists('./jump.png', function (exists) {
            if (exists) {
                fs.readFile('./jump.png', "binary", function (err, file) {
                    if (err) {
                        response.writeHead(500, {
                            'Content-Type': 'text/plain'
                        });

                        response.end(err);
                    } else {
                        response.setHeader('Access-Control-Allow-Origin','*');
                        response.writeHead(200, {
                            'Content-Type': 'image/png'
                        });
                        response.write(file, "binary");
                        response.end();
                    }
                });
            } else {
                response.end();
            }
        });
    },900);
});

server.listen(80,'127.0.0.1');