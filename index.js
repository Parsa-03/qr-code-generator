/* 
1. Using the inquirer npm package to get user input.
2. Using the qr-image npm package to turn the user entered URL into a QR code image.
3. Creating a txt file to save the user input using the native fs node module.
*/

import qr from 'qr-image'; 
import fs from 'fs';
import inquirer from 'inquirer';

inquirer
    .prompt([
        { "message": "Pass me the link of your desired site to see it's QR Code", "name": "URL", }
    ])
    .then((answers) => {
        const url = answers.URL;
        const qrCode = qr.image(url, { type: 'png' });
        qrCode.pipe(fs.createWriteStream(`${url}.png`));

        fs.writeFile("URL.txt", url, (err) => {
            if (err) throw err;
            console.log("The file has been saved!");
          });
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    });


