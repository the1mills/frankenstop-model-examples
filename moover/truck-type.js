const assert = require('assert');

function TruckType(obj){

    this.truckCategory = obj.truckCategory;  // x-small, small, medium, large, x-large

    this.legalNumberOfPassengers = obj.legalNumberOfPassengers; //besides the 1 driver, how many can legal passenge ;)

    this.maxPayload = obj.maxPayload; //each truck type may have max payload

    ///// dimensions //////
    this.dimensions = obj.dimensions;
    //TruckTypes have point values for all dimensions, whereas TruckCategory has ranges
    assert(this.dimensions.height, 'Please define a TruckType#height.');
    assert(this.dimensions.width, 'Please define a TruckType#width.');
    assert(this.dimensions.length, 'Please define a TruckType#length.');

}


TruckType.prototype.validate = function validate(){

    // validate state has having acceptable properties

};



TruckType.prototype.toJSON = function toJSON(){

};