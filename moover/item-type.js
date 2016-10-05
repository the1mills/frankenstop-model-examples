

const assert = require('assert');

function ItemType(obj){

    this.dimensions = obj.dimensions;


}


ItemType.prototype.toJSON = function toJSON(){

};


ItemType.prototype.validate = function validate(){

    // validate state has having acceptable properties

};