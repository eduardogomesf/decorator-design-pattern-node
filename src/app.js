const { promises } = require('fs');

async function run() {
    const fileTarget = 'super-secure-file.txt.enc';
    console.log('writing content on: ', fileTarget);
    
    const text = `It's now! ${new Date().toString()}`;

    await promises.writeFile(fileTarget, text);
    console.log('decrypted content: ', (await promises.readFile(fileTarget)).toString());
    console.log('finished');
}

module.exports = { run };