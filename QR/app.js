const express = require('express');
const bodyParser = require("body-parser");
const qr = require('qr-image');
const ejs = require('ejs')
const fs = require('fs');
const readline = require("readline");

const app = express();


// Set static folder
app.use(express.static('./public'))

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question("Enter string you want to convert into QRcode ", function(qr_txt) {

    // for generating text into QRcode

    var qr_png = qr.imageSync(qr_txt,{ type: 'pdf'});

    let qr_code_file_name = new Date().getTime() + '.pdf';


    fs.writeFileSync('./public/qr/' + qr_code_file_name, qr_png, (err) => {
        if(err){
            console.log(err);
        }
        
    })

   


    rl.close();
});
