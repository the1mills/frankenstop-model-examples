/**
 * Created by t_millal on 10/4/16.
 */


//core

//npm
const _ = require('underscore');

//project
const validate = require('../lib/shared-validation');


function Truck(obj, isPreValidate) {

    this.truckId = '???';
    this.truckTypeId = obj.truckTypeId;
    this.truckCategoryId = obj.truckCategoryId;
    this.truckMaintenanceState = obj.truckMaintenanceState || {};
    this.licensePlate = obj.licensePlate;
    this.registrationInfo = obj.registrationInfo;

    if(isPreValidate !== false){
        //this may throw an error, for purposes of failing-fast for devs
        this.preValidate(Object.keys(this));
    }

}

Truck.prototype.getRef = function(){
    return '/trucks/' + this.truckId;
};

Truck.getSchema = function getTruckSchema() {

    return Object.freeze({

        allowExtraneousProperties: false,

        properties: {

            truckId: {
                type: 'uid',
                primaryKey: true,
                required: false
            },

            truckTypeId: {
                type: 'uid',
                required: true
            },

            truckCategoryId: {
                type: 'uid',
                required: true
            },

            truckMaintenanceState: {
                type: 'object',
                required: true,
                properties: {}
            },

            registrationInfo: {

                type: 'object',
                required: false,
                properties: {}

            },

            licensePlate: {
                type: 'string',
                required: true
            }

        }
    })

};


Truck.prototype.preValidate = function () {
    var list = _.flatten(Array.prototype.slice.call(arguments));
    var errors = validate(Truck.getSchema(), list, this);
    if (errors.length > 0) {
        throw errors.map(e => (e.stack || String(e))).join('\n\n');  //yummy as ever
    }
};

Truck.prototype.validate = function () {
    //this should not throw an error, simply return list of validation errors
    var list = Object.keys(Truck.getSchema().properties);
    return validate(Truck.getSchema(), list, this);
};


Truck.prototype.toRefPath = function () {
    return '/trucks/' + this.truckId;
};

Truck.prototype.toJSON = function toJSON() {

};


module.exports = Truck;