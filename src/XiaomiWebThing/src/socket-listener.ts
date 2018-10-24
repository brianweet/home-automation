import dgram from 'dgram';
import { EventEmitter } from 'events';

import { AddressInfo } from 'net';

const deserializeMessage = (buffer: Buffer, rinfo: AddressInfo) => {
    try {
        const msg = JSON.parse((buffer as unknown) as string);
        console.log(`socket got: ${buffer} from ${rinfo.address}:${rinfo.port}`);
        return msg;
    } catch (err) {
        console.log('invalid message: ' + buffer);
        return null;
    }
};

export class XiaomiSocketListener extends EventEmitter {
    socket: dgram.Socket;
    constructor() {
        super();

        this.socket = dgram.createSocket({
            type: 'udp4',
            reuseAddr: true,
        });

        this.socket.on('error', err => {
            console.log(`socket error:\n${err.stack}`);
            this.socket.close();
        });
        this.socket.on('message', (buffer, rinfo) => {
            const msg = deserializeMessage(buffer, rinfo);
            this.emit('message', msg);
        });
        this.socket.on('listening', () => {
            const address: any = this.socket.address();
            console.log(`socket listening ${address.address}:${address.port}`);
        });
        const receivePort = 9898;
        const multicastAddress = '224.0.0.50';

        this.socket.bind({ port: receivePort, exclusive: false }, () => {
            this.socket.addMembership(multicastAddress);
        });
    }
}
