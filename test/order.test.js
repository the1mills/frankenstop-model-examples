/**
 * Created by t_millal on 10/8/16.
 */


const suman = require('suman');
const Test = suman.init(module, {});


Test.describe(__filename, function () {

    const Order = require('../moover').Order;

    var orderData = [
        {
            orderId: 'some-uid',
            dateCreated: new Date().toISOString(),
            submitted: true,
            dateItemsUpdated: new Date().toISOString(),
            dateQuoteUpdated: new Date().toISOString(),

            selectedTimeslot: {},
            state: 'some state data',
            status: 'some status data',


            pickup: {
                floors: 3,
                elevator: false,
                address: '831 laverne Way, Los Altos, CA, 94022',
                contactName: 'Michelle Dohmage',
                contactPhone: '650-259-3459',
                additionalInfo: 'some addition info',

            },


            dropoff: {

                floors: 2,
                elevator: true,
                address: '8999 laverne Way, Los Altos, CA, 94022',
                contactName: 'Oleg Zandr',
                contactPhone: '650-359-3450',
                additionalInfo: 'some addition info',

            },

            quote: {

                distanceAmount: 44,
                distanceMiles: 33,
                rate: 22,
                taxAmount: 55,
                totalAmount: 88

            },

            items: {

                "1": {
                    "itemType": "kitchen",
                    "key": "1",
                    "label": "Freezer",
                    "moveTime": 600,
                    "visible": true,
                    "weight": .6
                },
                "12345": {
                    "itemType": "kitchen",
                    "key": "12345",
                    "label": "Small Oven",
                    "moveTime": 120,
                    "visible": true,
                    "weight": .03
                },
                "328-A52": {
                    "itemType": "kitchen",
                    "key": "328-A52",
                    "label": "Desk",
                    "moveTime": 0,
                    "visible": true,
                    "weight": 0
                }


            }
        },

        // {
        //     latitude: 0,
        //     longitude: 190
        // }

    ];

    orderData.forEach(d => {

        this.it('constructor test', t => {
            const keys = Object.keys(Order.getSchema().properties);

            const errors = new Order(d, false).validate(keys);

            if (errors.length > 0) {
                console.log(errors.map(e => e.stack).join('\n\n'));
                throw 'failed';
            }
        });

    });

});

