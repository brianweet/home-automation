import { IDeviceConfig } from '../data/device-configuration';
import { EventEmitter } from 'events';
import { IXiaomiMessage } from './xiaomi-message';

const { Property, Thing, Value } = require('webthing');

const propertyNames = {
    doorOpen: 'doorOpen',
};

export class DoorSensorThing extends Thing {
    deviceConfig: IDeviceConfig;

    doorOpenStatus = new Value(false);
    currentTimeout: NodeJS.Timer | null = null;

    constructor(deviceConfig: IDeviceConfig, eventEmitter: EventEmitter) {
        super(deviceConfig.name, ['DoorSensor'], deviceConfig.name);
        this.deviceConfig = deviceConfig;

        this.addProperty(
            new Property(this, propertyNames.doorOpen, this.doorOpenStatus, {
                '@type': 'OpenProperty',
                label: 'Door status',
                type: 'boolean',
                description: 'Door/window open status',
                readOnly: true,
            })
        );

        eventEmitter.on('message', this.handleMessage);
    }

    handleMessage = (message: IXiaomiMessage) => {
        if (message.sid !== this.deviceConfig.sid) {
            return;
        }
        console.log('handleMessage', typeof message, message);
        const newData = JSON.parse(message.data);
        if (newData.status === 'open' || newData.status === 'close') {
            this.doorOpenStatus.notifyOfExternalUpdate(newData.status === 'open');
        }
    };
}
