export interface IDeviceConfig {
    sid: string;
    short_id: string;
    name: string;
    model: DeviceType;
}
export enum DeviceType {
    Switch = 'Switch',
    WeatherV1 = 'weather.v1',
    Motion = 'motion',
    Magnet = 'magnet',
}
export const devices: IDeviceConfig[] = [
    { sid: '158d000201b2f6', short_id: '5336', name: 'TPH outside', model: DeviceType.WeatherV1 },
    { sid: '158d000201b0e5', short_id: '63210', name: 'TPH bedroom', model: DeviceType.WeatherV1 },
    {
        sid: '158d00020184ce',
        short_id: '40469',
        name: 'TPH livingroom',
        model: DeviceType.WeatherV1,
    },
    { sid: '158d0001f55bf2', short_id: '54697', name: 'TPH office', model: DeviceType.WeatherV1 },
    { sid: '158d00022cc5a8', short_id: '37709', name: 'TPH bathroom', model: DeviceType.WeatherV1 },
    {
        sid: '158d0001ad3e11',
        short_id: '26341',
        name: 'Motion hallway-center',
        model: DeviceType.Motion,
    },
    {
        sid: '158d0001dbb9a8',
        short_id: '46314',
        name: 'Motion hallway-living',
        model: DeviceType.Motion,
    },
    {
        sid: '158d000202578c',
        short_id: '48188',
        name: 'Front door sensor',
        model: DeviceType.Magnet,
    },
    { sid: '158d000120e9f5', short_id: '37124', name: 'Switch button', model: DeviceType.Switch },
];
