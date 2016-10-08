/**
 * Created by t_millal on 10/8/16.
 */


const suman = require('suman');
const Test = suman.init(module, {});


Test.describe(__filename, function () {

    const Order = require('../moover').Order;

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
            const keys = Object.keys(Order.getSchema().properties);
            console.log('keys:', keys);
            new Order(d, false).preValidate(keys);
        });

    });

});

