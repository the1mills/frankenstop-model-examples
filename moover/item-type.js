const assert = require('assert');
const validateModel = require('../lib/shared-validation');

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

ItemType.getSchema = function getSchema() {

    return {

        properties: {

            numberOfMooversNeeded: {
                type: "number",
                required: true
            },

            dimensions: {
                type: "object",
                required: true,
                properties: {
                    minHeight: {
                        type: "number",
                        required: true
                    },
                    maxHeight: {
                        type: "number",
                        required: true
                    },
                    minWidth: {
                        type: "number",
                        required: true
                    },
                    maxWidth: {
                        type: "number",
                        required: true
                    },
                    minLength: {
                        type: "number",
                        required: true
                    },
                    maxLength: {
                        type: "number",
                        required: true
                    }
                }
            }


        }
    }


};


ItemType.prototype.toJSON = function toJSON() {

};


ItemType.prototype.validate = function validate() {
    return validateModel(ItemType.getSchema(), this);
};


module.exports = ItemType;