const { MultipleThings, WebThingServer } = require('webthing');
import { devices } from './data/device-configuration';
import { createWebThing } from './device-factory';
import { XiaomiSocketListener } from './socket-listener';

const thingsName = 'XiaomiGatewayHub';
const webThingPort = 8889;

function runServer() {
    const socketListener = new XiaomiSocketListener();
    const webthings = devices.map(createWebThing(socketListener)).filter(x => x != null);
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
