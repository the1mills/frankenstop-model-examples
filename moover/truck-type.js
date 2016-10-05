const assert = require('assert');

function TruckType(obj){

    this.dimensions = obj.dimensions;
    this.kind = obj.kind;
    this.numberOfPassengers = obj.numberOfPassengers;
    this.maxPayload = obj.maxPayload;

}


TruckType.prototype.validate = function validate(){

    // validate state has having acceptable properties

};



TruckType.prototype.toJSON = function toJSON(){

};