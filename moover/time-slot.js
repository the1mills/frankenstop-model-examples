//core

//npm
const _ = require('underscore');

//project
const validate = require('../lib/shared-validation');


function TimeSlot(obj, isPreValidate) {

    this.timeSlotId = this.timeSlotId; //|| UUID
    this.dateCreated = new Date().toISOString();

    if (isPreValidate !== false) {
        //default is to run preValidation
        //this may throw an error, for purposes of failing-fast for devs
        this.preValidate(Object.keys(this));
    }

}

TimeSlot.prototype.getRef = function () {
    return '/Timeslots/' + this.timeslotId;
};


TimeSlot.getSchema = function getSchema() {

    return Object.freeze({

        //all extant properties in models must exist on schema if this is set to false
        allowExtraneousProperties: false,
        forceAllObjectsToHavePropertyValidation: false,

        properties: {

            timeslotId: {
                type: 'uid',
                required: true,
                primaryKey: true
            },

            timeslotNumber: {
                type: 'integer',
                required: true
            },

            numberOfMoovers: {
                type: 'integer',
                required: true
            },

            numberOfTrucks: {
                type: 'integer',
                required: true
            },

            maxNumberOfMoovers:{
                type: 'integer',
                required: true
            },

            maxNumberOfTrucks:{
                type: 'integer',
                required: true
            },


            orderIds: {
                type: 'array',
                required: true,
                elements: {
                    properties: {}
                }
            },


            dateCreated: {
                type: 'date',
                required: false,
            },

            dateUpdated: {
                type: 'date',
                required: false
            },


        }
    })

};

TimeSlot.validate = function (obj) {
    return validate(TimeSlot.getSchema(), Object.keys(obj), obj);
};


TimeSlot.prototype.addItem = function (item) {

    const items = {};
    const key = Object.keys(item)[0];
    items[key] = item;

    if (this.items[key]) {
        throw new Error('Key already exists in items object => ' + key);
    }

    const errors = TimeSlot.validate({
        items: items
    });

    if (errors.length < 1) {
        this.items[key] = item;
        return null;
    }
    throw errors.map(e => e.stack || e).join('\n\n');
};


TimeSlot.prototype.setDropoff = function (dropoff) {

    const errors = TimeSlot.validate({
        dropoff: dropoff
    });

    if (errors.length < 1) {
        this.dropoff = dropoff;
        return null;
    }
    throw errors.map(e => e.stack || e).join('\n\n');
};


TimeSlot.prototype.setPickup = function (pickup) {

    const errors = TimeSlot.validate({
        pickup: pickup
    });

    if (errors.length < 1) {
        this.pickup = pickup;
        return null;
    }
    throw errors.map(e => e.stack || e).join('\n\n');
};


TimeSlot.prototype.preValidate = function () {
    var list = _.flatten(Array.prototype.slice.call(arguments));
    var errors = validate(TimeSlot.getSchema(), list, this);
    if (errors.length > 0) {
        throw errors.map(e => (e.stack || String(e))).join('\n\n');  //yummy as ever
    }
};

TimeSlot.prototype.validate = function () {
    var list = Object.keys(TimeSlot.getSchema().properties);

    //TODO: if building has more than 6 stairs, and no elevator, do we do the job?
    //TODO: need to add extra validation here

    return validate(TimeSlot.getSchema(), list, this);
};


TimeSlot.prototype.toJSON = function toJSON() {

    //TODO: this should remove properties that should not be persisted

};


module.exports = TimeSlot;
