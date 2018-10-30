import { IDeviceConfig } from '../data/device-configuration';
import { EventEmitter } from 'events';
import { IXiaomiMessage } from './xiaomi-message';

const { Property, Thing, Value } = require('webthing');

const propertyNames = {
    motion: 'motion',
};

export class MotionThing extends Thing {
    deviceConfig: IDeviceConfig;

    motionStatus = new Value(false);
    currentTimeout: NodeJS.Timer | null = null;

    constructor(deviceConfig: IDeviceConfig, eventEmitter: EventEmitter) {
        super(deviceConfig.name, ['MotionSensor'], deviceConfig.name);
        this.deviceConfig = deviceConfig;

        this.addProperty(
            new Property(this, propertyNames.motion, this.motionStatus, {
                '@type': 'MotionProperty',
                label: 'Motion',
                type: 'boolean',
                description: 'Motion detected',
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
        if (newData.status === 'motion') {
            this.motionStatus.notifyOfExternalUpdate(true);

            // The sensor is very slow, but just in case
            if (this.currentTimeout !== null) {
                clearTimeout(this.currentTimeout);
            }

            this.resetTimeout = setTimeout(() => {
                this.currentTimeout = null;
                this.motionStatus.notifyOfExternalUpdate(false);
            }, 10000);
        }
    };
}
