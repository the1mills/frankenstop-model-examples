//core

//npm
const _ = require('underscore');

//project
const validate = require('../lib/shared-validation');


function Order(obj, isPreValidate) {

    this.orderId = this.orderId; //|| UUID
    this.dateCreated = new Date().toISOString();
    this.dateUpdated = new Date().toISOString();
    this.dateItemsUpdated = obj.dateItemsUpdated || new Date().toISOString();
    this.dateQuoteUpdated = obj.dateQuoteUpdated || new Date().toISOString();
    this.orderId = obj.orderId || '????';
    this.customerId = obj.customerId || 'some-uid';
    this.submitted = obj.submitted || false; // default is false
    this.pickup = obj.pickup || {};
    this.dropoff = obj.dropoff || {};
    this.items = obj.items || {};
    this.status = obj.status || 'pending';
    this.state = obj.state || {};
    this.selectedTimeslot = obj.selectedTimeslot || {};
    this.quote = obj.quote || {};

    if (isPreValidate !== false) {  //default is to run preValidation
        //this may throw an error, for purposes of failing-fast for devs
        this.preValidate(Object.keys(this));
    }

}

Order.prototype.getRef = function(){
    return '/orders/' + this.orderId;
};


Order.getSchema = function getSchema() {

    return Object.freeze({

        //all extant properties in models must exist on schema if this is set to false
        allowExtraneousProperties: false,
        forceAllObjectsToHavePropertyValidation: false,

        properties: {

            orderId: {
                type: 'uid',
                required: true,
                primaryKey: true
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
                type: 'object',  //active, pending etc
                required: true,
                properties: {}
            },
            status: {
                type: 'string',
                required: true
            },


            pickup: {
                type: 'object',
                required: true,
                properties: {

                    addressId: {
                        type: 'uid',
                        required: true
                    },


                    address: {   // Address class will validate this for us :) nice stuff
                        type: 'object',
                        required: false,
                        properties:{
                            //TODO: should "floors" and "elevator" be in Address model?
                            floors: {
                                type: 'integer',
                                required: true
                            },
                            elevator: {
                                type: 'boolean',
                                required: false
                            },
                        }
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

                    addressId: {
                        type: 'uid',
                        required: false,
                    },


                    // TODO: "floors" and "elevator" should be in address?, user can update that data

                    floors: {
                        type: 'number',
                        required: true
                    },
                    elevator: {
                        type: 'boolean',
                        required: false
                    },

                    address: {  //TODO: shouldn't address be broken down into components? So the address is valid?
                        type: 'object',
                        required: false,
                        persist: false,
                        properties:{
                            //TODO: should "floors" and "elevator" be in Address model?
                            floors: {
                                type: 'integer',
                                required: true
                            },
                            elevator: {
                                type: 'boolean',
                                required: false
                            },
                        }
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

Order.validate = function (obj) {
    return validate(Order.getSchema(), Object.keys(obj), obj);
};


Order.prototype.addItem = function (item) {

    const items = {};
    const key = Object.keys(item)[0];
    items[key] = item;

    if (this.items[key]) {
        throw new Error('Key already exists in items object => ' + key);
    }

    const errors = Order.validate({
        items: items
    });

    if (errors.length < 1) {
        this.items[key] = item;
        return null;
    }
    throw errors.map(e => e.stack || e).join('\n\n');
};


Order.prototype.setDropoff = function (dropoff) {

    const errors = Order.validate({
        dropoff: dropoff
    });

    if (errors.length < 1) {
        this.dropoff = dropoff;
        return null;
    }
    throw errors.map(e => e.stack || e).join('\n\n');
};


Order.prototype.setPickup = function (pickup) {

    const errors = Order.validate({
        pickup: pickup
    });

    if (errors.length < 1) {
        this.pickup = pickup;
        return null;
    }
    throw errors.map(e => e.stack || e).join('\n\n');
};


Order.prototype.preValidate = function () {
    var list = _.flatten(Array.prototype.slice.call(arguments));
    var errors = validate(Order.getSchema(), list, this);
    if (errors.length > 0) {
        throw errors.map(e => (e.stack || String(e))).join('\n\n');  //yummy as ever
    }
};

Order.prototype.validate = function () {
    var list = Object.keys(Order.getSchema().properties);

    //TODO: if building has more than 6 stairs, and no elevator, do we do the job?
    //TODO: need to add extra validation here

    return validate(Order.getSchema(), list, this);
};


Order.prototype.toJSON = function toJSON() {

    //TODO: this should remove properties that should not be persisted

};


module.exports = Order;
