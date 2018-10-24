import dgram from 'dgram';
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

const socket = dgram.createSocket({
    type: 'udp4',
    reuseAddr: true,
});

socket.on('error', err => {
    console.log(`socket error:\n${err.stack}`);
    socket.close();
});

socket.on('message', (buffer, rinfo) => {
    const msg = deserializeMessage(buffer, rinfo);
    switch (msg.cmd) {
        case 'iam':
            const gatewayInfo = {
                ip: msg.ip,
                port: msg.port,
                sid: msg.sid,
            };

            var getIdListMessage = '{"cmd":"get_id_list"}';
            console.log(
                'Send ' + getIdListMessage + ' to ' + gatewayInfo.ip + ':' + gatewayInfo.port
            );
            socket.send(
                getIdListMessage,
                0,
                getIdListMessage.length,
                gatewayInfo.port,
                gatewayInfo.ip
            );
            break;
        default:
            console.log('No handler');
    }
});

socket.on('listening', () => {
    const address: any = socket.address();
    console.log(`socket listening ${address.address}:${address.port}`);
});

const receivePort = 9898;
const multicastAddress = '224.0.0.50';
const multicastPort = 4321;

socket.bind({ port: receivePort, exclusive: false }, () => {
    socket.addMembership(multicastAddress);

    // Discover devices
    var msg = '{"cmd": "whois"}';
    console.log(
        'Send ' + msg + ' to a multicast address ' + multicastAddress + ':' + multicastPort
    );
    socket.send(msg, 0, msg.length, multicastPort, multicastAddress);
});
