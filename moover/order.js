/**
 * Created by t_millal on 10/8/16.
 */




const assert = require('assert');
const validateModel = require('../lib/shared-validation');


function Order(obj) {


    this.pickup = obj.pickup;
    this.dropoff = obj.dropoff;

    this.items = obj.items;

    this.categoryName = obj.categoryName;  // x-small, small, medium, large, x-large
    this.dimensions = obj.dimensions;


}


Order.getSchema = function getSchema() {

    return {

        //all extant properties in models should be in schema if this is set to false
        allowExtraneousProperties: false,

        properties: {

            orderId: {
                type: 'UID',
                required: true
            },

            dateCreated: {
                type: 'Date',
                required: true
            },

            submitted: {  //dateCreated should be the value to look for instead?
                type: 'boolean',
                required: true
            },

            itemsUpdated: {
                type: 'Date',
                required: false
            },

            quoteUpdated: {
                type: 'Date',
                required: false
            },


            selectedTimeslot: {},
            state: {
                type: 'string',  //active, pending etc
                required: true
            },
            status: {
                type: 'string',
                required: true
            },


            pickup: {
                type: 'object',
                required: true,
                properties: {
                    additionalInfo: {
                        type: 'string',
                        required: false
                    },
                    address: {
                        type: 'string',
                        required: true
                    },
                    contactName: {
                        type: 'string',
                        required: true
                    },
                    contactNumber: {
                        type: 'string',
                        required: true
                    }
                }

            },


            dropoff: {
                type: 'object',
                required: true,
                properties: {
                    floors: {
                        type: 'number',
                        required: true
                    },
                    elevator: {
                        type: 'boolean',
                        required: false
                    },
                    address: {  //TODO: shouldn't address be broken down into components? So the address is valid?
                        type: 'string',
                        required: true
                    },
                    contactName: {
                        type: 'string',
                        required: true
                    },
                    contactNumber: {
                        type: 'string',
                        required: true
                    }
                }


            },

            quote: {
                type: 'object',
                required: true,
                properties: {
                    distanceAmount: {
                        type: 'number',
                        required: true
                    },
                    distanceMiles: {
                        type: 'number',
                        required: true
                    },
                    rate: {
                        type: 'number',
                        required: true
                    },
                    taxAmount: {
                        type: 'number',
                        required: true
                    },
                    totalAmount: {
                        type: 'number',
                        required: true
                    }
                }
            },

            items: {

                // "1" : {
                //     "itemType" : "kitchen",
                //     "key" : "1",
                //     "label" : "Freezer",
                //     "moveTime" : "600",
                //     "visible" : true,
                //     "weight" : ".6"
                // },

                type: 'object',
                required: true,
                values: {
                    required: true,  //length of Object.keys() needs to be > 1
                    type: 'object',
                    properties: {
                        key: {
                            type: 'UID',
                            required: true,
                        },
                        itemType: {
                            type: 'UID',
                            required: true
                        },
                        label: {},
                        moveTime: {},
                        visible: {
                            type: 'boolean'
                        },
                        weight: {
                            type: 'number'
                        }
                    }
                }
            }

        },
    }


};


Order.prototype.validate = function validate() {
    return validateModel(Order.getSchema(), this);
};


Order.prototype.toJSON = function toJSON() {

};


module.exports = Order;
