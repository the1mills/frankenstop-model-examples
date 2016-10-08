/**
 * Created by t_millal on 10/4/16.
 */


var assert = require('assert');
var validate = require('../lib/shared-validation');

function Truck(obj) {

    this.truckId = '???';
    this.truckTypeId = obj.truckTypeId;
    this.truckCategoryId = obj.truckCategoryId;
    this.truckMaintenanceState = obj.truckMaintenanceState || {};
    this.licensePlate = obj.licensePlate;
    this.registrationInfo = obj.registrationInfo;

    //this may throw an error, for purposes of failing-fast for devs
    this.preValidate(['truckTypeId', 'truckCategoryId']);

}


Truck.getSchema = function getTruckSchema() {

    return {

        allowExtraneousProperties: false,

        properties: {

            truckId: {
                type: 'UID',
                required: false
            },

            truckTypeId: {
                type: 'UID',
                required: true
            },

            truckCategoryId: {
                type: 'UID',
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
    }

};


Truck.prototype.preValidate = function preValidateTruckModel(list) {
    list = _.flatten([list]);
    var errors = validate(Truck.getSchema(), list, this);
    if (errors.length > 0) {
        throw errors.map(e => (e.stack || String(e))).join('\n\n');  //yummy as ever
    }
};

Truck.prototype.validate = function validateTruckModel() {
    //this should not throw an error, simply return list of validation errors
    var list = Object.keys(Truck.getSchema().properties);
    return validate(Truck.getSchema(), list, this);
};


Truck.prototype.toRefPath = function () {
    return '/trucks/' + this.truckId;
};

Truck.prototype.toJSON = function toJSON() {

};