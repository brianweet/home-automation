import { IDeviceConfig, DeviceType } from '../data/devices';
import { WeatherV1Thing } from './devices/weather-v1-thing';

export const createWebThing = (deviceConfiguration: IDeviceConfig) => {
    switch (deviceConfiguration.model) {
        case DeviceType.Magnet:
            break;
        case DeviceType.Motion:
            break;
        case DeviceType.Switch:
            break;
        case DeviceType.WeatherV1:
            return new WeatherV1Thing(deviceConfiguration);
        default:
            return null;
    }
};
