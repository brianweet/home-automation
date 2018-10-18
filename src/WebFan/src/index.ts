const { SingleThing, WebThingServer } = require('webthing');
import { WebFanThing } from './webfan-thing';

function runServer() {
    const thing = new WebFanThing();

    // If adding more than one thing, use MultipleThings() with a name.
    // In the single thing case, the thing's name will be broadcast.
    const server = new WebThingServer(new SingleThing(thing), 8888);

    process.on('SIGINT', () => {
        server.stop();
        process.exit();
    });

    server.start();
    console.log('Web fan server started');
}

runServer();
