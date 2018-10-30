import { DeviceType } from '../data/device-configuration';
export interface IXiaomiMessage {
    cmd: 'heartbeat' | 'report';
    model: DeviceType;
    sid: string;
    short_id: string;
    token: string;
    data: string;
}
