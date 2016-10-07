const assert = require('assert');

function TruckCategory(obj){

    this.categoryName = obj.categoryName;  // x-small, small, medium, large, x-large

    ///// dimensions  /////
    this.dimensions = obj.dimensions;

    //TruckCategory has dimension ranges, not just point values
    assert(this.dimensions.minHeight, 'Please define an TruckCategory#minHeight.');
    assert(this.dimensions.maxHeight, 'Please define an TruckCategory#maxHeight.');

    assert(this.dimensions.minWidth, 'Please define an TruckCategory#minWidth.');
    assert(this.dimensions.maxWidth, 'Please define an TruckCategory#maxWidth.');

    assert(this.dimensions.minLength, 'Please define an TruckCategory#minLength.');
    assert(this.dimensions.maxLength, 'Please define an TruckCategory#maxLength.');


}


TruckCategory.prototype.validate = function validate(){

    // validate state has having acceptable properties

};



TruckCategory.prototype.toJSON = function toJSON(){

};