const assert = require('assert');

function ItemType(obj) {


    this.numberOfMooversNeeded = obj.numberOfMooversNeeded;
    assert(Number.isInteger(this.numberOfMooversNeeded), 'ItemType#numberOfMooversNeeded must be an integer.');

    ///// dimensions  /////
    this.dimensions = obj.dimensions;

    //ItemTypes have dimension ranges, not just point values
    assert(this.dimensions.minHeight, 'Please define an ItemType#minHeight.');
    assert(this.dimensions.maxHeight, 'Please define an ItemType#maxHeight.');

    assert(this.dimensions.minWidth, 'Please define an ItemType#minWidth.');
    assert(this.dimensions.maxWidth, 'Please define an ItemType#maxWidth.');

    assert(this.dimensions.minLength, 'Please define an ItemType#minLength.');
    assert(this.dimensions.maxLength, 'Please define an ItemType#maxLength.');

    ///

}


ItemType.prototype.toJSON = function toJSON() {

};


ItemType.prototype.validate = function validate() {

    // validate state has having acceptable properties

};
