const fs = require('fs-extra');
const {execSync} = require('child_process')
const package = require("../package.json");
const replace = require('replace-in-file');


fs.rmSync("public", { recursive: true, force: true });

for(let i = 0; i < package['how-tos'].length; i++) {
    let howto =  package['how-tos'][i];
    execSync('npm install', {
        cwd: 'how-to/' + howto,
        stdio: 'inherit'
      });
    execSync('npm run build-client', {
        cwd: 'how-to/' + howto,
        stdio: 'inherit'
      });  
    fs.copySync('how-to/' + package['how-tos'][i] + '/public', 'public/' + package['how-tos'][i]);    
    let options = {
      files: 'public/' + package['how-tos'][i] + '/**/*.json',
      from: /http:\/\/localhost:8080/g,
      to: 'https://built-on-openfin.github.io/workspace-starter/v' + package.version + '/' + package['how-tos'][i],
    };
    try {
      let results = replace.sync(options);
      console.log('Replacement results:', results);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }
}
