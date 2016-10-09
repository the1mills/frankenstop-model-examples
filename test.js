console.log(JSON.stringify(

    {
        "orderId": "some-uid",
        "dateCreated": "new Date().toISOString()",
        "submitted": true,
        "dateItemsUpdated": "new Date().toISOString()",
        "dateQuoteUpdated": "new Date().toISOString()",

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
                // "yolo": 'rciar',
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
    }

));