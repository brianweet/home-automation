import { IDeviceConfig } from '../../data/devices';

const { Property, Thing, Value } = require('webthing');

const onOffPropertyName = 'on';
const fanLevelPropertyName = 'level';

export class WeatherV1Thing extends Thing {
    constructor(deviceConfig: IDeviceConfig) {
        super(deviceConfig.name, ['OnOffSwitch'], 'Home ventilation fan');
        this.addProperty(
            new Property(
                this,
                fanLevelPropertyName,
                new Value(15, (v: number) => {
                    console.log('Fan level is now', v);

                    // Schedule turn fan on function
                    setTimeout(() => {
                        const onOffProp = this.findProperty(onOffPropertyName);
                        onOffProp.setValue(true);
                    }, 0);
                }),
                {
                    '@type': 'LevelProperty',
                    label: 'Fan speed level',
                    type: 'number',
                    description: 'The fan level from 0-15',
                    minimum: 0,
                    maximum: 15,
                }
            )
        );
    }

    handleMessage() {}
}
