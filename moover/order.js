
//core

//npm
const _ = require('underscore');

//project
const validate = require('../lib/shared-validation');



function Order(obj, isPreValidate) {

    this.dateCreated = new Date().toISOString();
    this.dateUpdated = new Date().toISOString();
    this.dateItemsUpdated = obj.dateItemsUpdated || new Date().toISOString();
    this.dateQuoteUpdated = obj.dateQuoteUpdated || new Date().toISOString();
    this.orderId = obj.orderId;
    this.customerId = obj.customerId || 'some-uid';
    this.submitted = obj.submitted;
    this.pickup = obj.pickup;
    this.dropoff = obj.dropoff;
    this.items = obj.items;
    this.status = obj.status;
    this.state = obj.state || {};
    this.selectedTimeslot = obj.selectedTimeslot || {};
    this.quote = obj.quote;

    if (isPreValidate) {
        this.preValidate(['pickup', 'dropoff']);
    }

}


Order.getSchema = function getSchema() {

    return Object.freeze({

        //all extant properties in models must exist on schema if this is set to false
        allowExtraneousProperties: false,

        properties: {

            orderId: {
                type: 'uid',
                required: true
            },

            customerId: {
                type: 'uid',
                required: true
            },

            dateCreated: {
                type: 'date',
                required: false,
            },

            dateUpdated: {
                type: 'date',
                required: false
            },

            submitted: {  //dateCreated should be the value to look for instead?
                type: 'boolean',
                required: true
            },

            dateItemsUpdated: {
                type: 'date',
                required: false
            },

            dateQuoteUpdated: {
                type: 'date',
                required: false
            },

            selectedTimeslot: {
                type: 'object',
                properties: {}
            },
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

                    floors: {
                        type: 'number',
                        required: true
                    },
                    elevator: {
                        type: 'boolean',
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
                    contactPhone: {
                        type: 'string',
                        required: true
                    },
                    additionalInfo: {
                        type: 'string',
                        required: false
                    },
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
                    contactPhone: {
                        type: 'string',
                        required: true
                    },
                    additionalInfo: {
                        type: 'string',
                        required: false
                    },
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
                type: 'object',
                required: true,
                keys: {
                    //TODO: validate key format...
                },
                values: {
                    minLength: 1, // customer needs to move at least one item
                    maxLength: 300, // customer cannot move more than 300 items
                    type: 'object',
                    properties: {
                        key: {
                            type: 'uid',
                            required: true,
                        },
                        itemType: {
                            type: 'uid',
                            required: true
                        },
                        label: {
                            type: 'string'
                        },
                        moveTime: {
                            type: 'number',
                        },
                        visible: {
                            type: 'boolean'
                        },
                        weight: {
                            type: 'number'
                        }
                    }
                }
            }

        }
    })

};


Order.prototype.preValidate = function () {
    var list = _.flatten(Array.prototype.slice.apply(null, arguments));
    var errors = validate(Order.getSchema(), list, this);
    if (errors.length > 0) {
        throw errors.map(e => (e.stack || String(e))).join('\n\n');  //yummy as ever
    }
};

Order.prototype.validate = function () {
    var list = Object.keys(Order.getSchema().properties);
    return validate(Order.getSchema(), list, this);
};


Order.prototype.toJSON = function toJSON() {

};


module.exports = Order;
