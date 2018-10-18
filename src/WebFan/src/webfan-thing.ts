import { runScript } from './run-script';
const { Property, Thing, Value } = require('webthing');
const path = require('path');

const startFanScript = path.resolve(__dirname, '../fan-scripts/set-level-fan.sh');
const stopFanScript = path.resolve(__dirname, '../fan-scripts/stop-fan.sh');
console.log('startFanScript', startFanScript);
const onOffPropertyName = 'on';
const fanLevelPropertyName = 'level';

export class WebFanThing extends Thing {
    constructor() {
        super('Home ventilation fan', ['OnOffSwitch'], 'Home ventilation fan');
        this.addProperty(
            new Property(
                this,
                onOffPropertyName,
                new Value(false, (v: boolean) => {
                    console.log('On-State is now', v);
                    const levelProp = this.getProperty(fanLevelPropertyName);
                    if (v) {
                        runScript(startFanScript, [`${levelProp}`]);
                    } else {
                        runScript(stopFanScript);
                    }
                }),
                {
                    '@type': 'OnOffProperty',
                    label: 'On/Off',
                    type: 'boolean',
                    description: 'Whether the fan is turned on',
                }
            )
        );
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
}
