/**
 * Created by t_millal on 10/8/16.
 */


const suman = require('suman');
const Test = suman.init(module, {});


Test.describe(__filename, function () {

    const Position = require('../moover').Position;

    var positionData = [
        {
            latitude: 33,
            longitude: 44
        },

        {
            latitude: 0,
            longitude: 190
        }

    ];

    positionData.forEach(d => {

        this.it('constructor test', t => {
            const keys = Object.keys(Position.getSchema().properties);
            console.log('keys:', keys);
            new Position(d, false).preValidate(keys);
        });

    });

});

