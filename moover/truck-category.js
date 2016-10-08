const assert = require('assert');
const validateModel = require('../lib/shared-validation');


function TruckCategory(obj) {

    this.categoryName = obj.categoryName;  // x-small, small, medium, large, x-large

    ///// dimensions  /////
    this.dimensions = obj.dimensions;

    //TruckCategory has dimension ranges, not just point values
    // assert(this.dimensions.minHeight, 'Please define a TruckCategory#minHeight.');
    // assert(this.dimensions.maxHeight, 'Please define a TruckCategory#maxHeight.');
    //
    // assert(this.dimensions.minWidth, 'Please define a TruckCategory#minWidth.');
    // assert(this.dimensions.maxWidth, 'Please define a TruckCategory#maxWidth.');
    //
    // assert(this.dimensions.minLength, 'Please define a TruckCategory#minLength.');
    // assert(this.dimensions.maxLength, 'Please define a TruckCategory#maxLength.');


}


TruckCategory.getSchema = function getSchema() {

    return {

        //all extant properties in models should be in schema if this is set to false
        allowExtraneousProperties: false,

        properties: {

            categoryName: {
                type: "string",
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


TruckCategory.prototype.validate = function validate() {

    // validate state has having acceptable properties
    return validateModel(TruckCategory.getSchema(), this);
};


TruckCategory.prototype.toJSON = function toJSON() {

};


module.exports = TruckCategory;