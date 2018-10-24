import { IDeviceConfig, DeviceType } from '../data/device-configuration';
import { EventEmitter } from 'events';

const { Property, Thing, Value } = require('webthing');

const propertyNames = {
    temperature: 'temperature',
    humidity: 'humidity',
    voltage: 'voltage',
};

export class WeatherV1Thing extends Thing {
    deviceConfig: IDeviceConfig;

    humidityLevel = new Value(0.0);
    temperatureLevel = new Value(0.0);
    voltageLevel = new Value(0.0);

    constructor(deviceConfig: IDeviceConfig, eventEmitter: EventEmitter) {
        super(deviceConfig.name, ['MultiLevelSensor'], deviceConfig.name);
        this.deviceConfig = deviceConfig;

        this.addProperty(
            new Property(this, propertyNames.humidity, this.humidityLevel, {
                '@type': 'LevelProperty',
                label: 'Humidity',
                type: 'number',
                description: 'The current humidity in %',
                minimum: 0,
                maximum: 100,
                unit: 'percent',
                readOnly: true,
            })
        );
        this.addProperty(
            new Property(this, propertyNames.temperature, this.temperatureLevel, {
                '@type': 'LevelProperty',
                label: 'Temperature',
                type: 'number',
                description: 'The current temperature in degrees C',
                minimum: -100,
                maximum: 100,
                unit: 'celcius',
                readOnly: true,
            })
        );
        this.addProperty(
            new Property(this, propertyNames.voltage, this.voltageLevel, {
                '@type': 'VoltageProperty',
                label: 'Voltage',
                type: 'number',
                description: 'The voltage of the battery',
                minimum: 0,
                maximum: 4,
                unit: 'volt',
                readOnly: true,
            })
        );

        eventEmitter.on('message', this.handleMessage);
    }

    handleMessage = (message: XiaomiMessage) => {
        if (message.sid !== this.deviceConfig.sid) {
            return;
        }
        console.log('handleMessage', typeof message, message);
        const newData = JSON.parse(message.data);
        if (newData.humidity) {
            this.humidityLevel.notifyOfExternalUpdate(newData.humidity / 100);
        }
        if (newData.temperature) {
            this.temperatureLevel.notifyOfExternalUpdate(newData.temperature / 100);
        }
        if (newData.voltage) {
            this.voltageLevel.notifyOfExternalUpdate(newData.voltage / 100);
        }
    };
}

interface XiaomiMessage {
    cmd: 'heartbeat' | 'report';
    model: DeviceType;
    sid: string;
    short_id: string;
    token: string;
    data: string;
}
