const localTunnel = require('localtunnel');

(async () => {
    const tunnel = await localTunnel({ port: 8080, subdomain: 'openfin-bbg-int' });

    console.log(`Tunnel URL: ${tunnel.url}`);

    tunnel.on('close', () => {
        console.log(`Tunnel closed URL: ${tunnel.url}`);
    });

    console.log('Press any key to exit');
    await keypress();

    tunnel.close();
    
})()
.catch(err => console.log(err))
.then(process.exit);

const keypress = async () => {
    process.stdin.setRawMode(true);
    return new Promise((resolve) => process.stdin.once('data', () => {
        process.stdin.setRawMode(false);
        resolve();
    }))
};
