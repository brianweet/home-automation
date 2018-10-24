const { MultipleThings, WebThingServer } = require('webthing');
import { devices } from '../data/devices';
import { createWebThing } from './device-factory';

const thingsName = 'XiaomiGatewayHub';
const webThingPort = 8889;

function runServer() {
    const webthings = devices.map(createWebThing).filter(x => x != null);
    const webThingServer = new WebThingServer(
        new MultipleThings(webthings, thingsName),
        webThingPort
    );

    process.on('SIGINT', () => {
        webThingServer.stop();
        process.exit();
    });

    webThingServer.start();
    console.log('Xiaomi hub server started');
}
runServer();
