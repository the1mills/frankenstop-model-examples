
//core

//npm
const _ = require('underscore');

//project
const validate = require('../lib/shared-validation');

function TruckType(obj) {

    this.truckCategoryId = obj.truckCategoryId;
    this.legalNumberOfPassengers = obj.legalNumberOfPassengers; //besides the 1 driver, how many can legal passenge ;)
    this.maxPayload = obj.maxPayload; //each truck type may have max payload

    ///// dimensions //////
    this.dimensions = obj.dimensions;
    //TruckTypes have point values for all dimensions, whereas TruckCategory has ranges

    this.preValidate(['dimensions', 'maxPayload', 'legalNumberOfPassengers', 'truckCategoryId']);

}


TruckType.prototype.preValidate = function preValidateTruckTypeModel() {
    // this method throws errors, for dev experience, not user experience
    var list = _.flatten(Array.prototype.slice.apply(null,arguments));
    var errors = validate(TruckType.getSchema(), list, this);
    if (errors.length > 0) {
        throw errors.map(e => (e.stack || String(e))).join('\n\n');  //yummy as ever
    }
};

TruckType.prototype.validate = function validate() {
    // this method does not throw errors, simply returns list of errors, for front-end usage
    var list = Object.keys(TruckType.getSchema().properties);
    return validate(TruckType.getSchema(), list, this);
};


TruckType.prototype.toJSON = function toJSON() {

};


return TruckType;