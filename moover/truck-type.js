//core

//npm
const _ = require('underscore');

//project
const validate = require('../lib/shared-validation');

function TruckType(obj,isPreValidate) {

    this.truckTypeId = obj.truckTypeId || '???';
    this.truckCategoryId = obj.truckCategoryId;
    this.legalNumberOfPassengers = obj.legalNumberOfPassengers; //besides the 1 driver, how many can legal passenge ;)
    this.maxPayload = obj.maxPayload; //each truck type may have max payload

    ///// dimensions //////
    this.dimensions = obj.dimensions;
    //TruckTypes have point values for all dimensions, whereas TruckCategory has ranges

    //default is to run preValidation
    if (isPreValidate !== false) {
        this.preValidate(['dimensions', 'maxPayload', 'legalNumberOfPassengers', 'truckCategoryId']);
    }


}

TruckType.getSchema = function getSchema() {

    return Object.freeze({

        //all extant properties in models should be in schema if this is set to false
        allowExtraneousProperties: false,

        properties: {

            truckTypeId: {
                type: 'uid',
                required: true,
                primaryKey: true
            },

            truckCategoryId: {
                type: 'uid',
                required: true
            },

            legalNumberOfPassengers: {
                type: 'integer',
                required: true
            },

            dimensions: {
                type: 'object',
                required: true,
                properties: {
                    height: {
                        type: 'number',
                        required: true,
                    },
                    width: {
                        type: 'number',
                        required: true,
                    },

                    length: {
                        type: 'number',
                        required: true,
                        minVal: 10,
                        maxVal: 10000
                    }
                }
            }
        }

    })

};


TruckType.prototype.preValidate = function () {
    // this method throws errors, for dev experience, not user experience
    var list = _.flatten(Array.prototype.slice.apply(null, arguments));
    var errors = validate(TruckType.getSchema(), list, this);
    if (errors.length > 0) {
        throw errors.map(e => (e.stack || String(e))).join('\n\n');  //yummy as ever
    }
};

TruckType.prototype.validate = function () {
    // this method does not throw errors, simply returns list of errors, for front-end usage
    var list = Object.keys(TruckType.getSchema().properties);
    return validate(TruckType.getSchema(), list, this);
};


TruckType.prototype.toJSON = function toJSON() {

};


return TruckType;