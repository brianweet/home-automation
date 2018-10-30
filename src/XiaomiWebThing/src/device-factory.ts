import { IDeviceConfig, DeviceType } from './data/device-configuration';
import { WeatherV1Thing } from './devices/weather-v1-thing';
import { EventEmitter } from 'events';
import { MotionThing } from './devices/motion-thing';
import { DoorSensorThing } from './devices/door-sensor-thing';

export const createWebThing = (eventEmitter: EventEmitter) => (
    deviceConfiguration: IDeviceConfig
) => {
    switch (deviceConfiguration.model) {
        case DeviceType.Magnet:
            return new DoorSensorThing(deviceConfiguration, eventEmitter);
        case DeviceType.Motion:
            return new MotionThing(deviceConfiguration, eventEmitter);
        case DeviceType.Switch:
            break;
        case DeviceType.WeatherV1:
            return new WeatherV1Thing(deviceConfiguration, eventEmitter);
        default:
            return null;
    }
};
