#!/usr/bin/env node

var fs = require('fs');

var request = require('request');

var data = require('./data');
data.op_returns = data.op_returns || [];

var currentHeight = data['last-height'] + 1;


requestBlock(currentHeight);


function requestBlock(height) {

    if(height > 386000){
        return;
    }

    request('http://api.coinsecrets.org/block/' + height, function(err, response, body){
        if(err){
            throw err;
        }
        data['last-height'] = height;

        JSON.parse(body).op_returns.forEach(function(opReturn){
            data.op_returns.push({
                txId: opReturn.txid,
                op_return: opReturn.ascii
            });
        });

        saveData();

        setTimeout(function(){
            requestBlock(height + 1);
        }, 1000);
    });
}

function saveData() {
    console.log(data['last-height'] + ': ' + data.op_returns.length + ' op_returns');
    fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));
}
