

//core

//npm
const _ = require('underscore');

//project
const validate = require('../lib/shared-validation');



function TruckCategory(obj) {

    this.categoryName = obj.categoryName;  // x-small, small, medium, large, x-large
    this.dimensions = obj.dimensions;
    this.preValidate(['dimensions','categoryName']);

}


TruckCategory.getSchema = function getSchema() {

    return {

        //all extant properties in models should be in schema if this is set to false
        allowExtraneousProperties: false,

        properties: {

            categoryName: {
                type: 'string',
                required: true
            },


            dimensions: {
                type: 'object',
                required: true,
                properties: {
                    minHeight: {
                        type: 'number',
                        required: true,
                        minVal: 10,
                        maxVal: 10000
                    },
                    maxHeight: {
                        type: 'number',
                        required: true,
                        minVal: 10,
                        maxVal: 10000
                    },
                    minWidth: {
                        type: 'number',
                        required: true,
                        minVal: 10,
                        maxVal: 10000
                    },
                    maxWidth: {
                        type: 'number',
                        required: true,
                        minVal: 10,
                        maxVal: 10000
                    },
                    minLength: {
                        type: 'number',
                        required: true,
                        minVal: 10,
                        maxVal: 10000
                    },
                    maxLength: {
                        type: 'number',
                        required: true,
                        minVal: 10,
                        maxVal: 10000
                    }
                }
            }
        }


    }

};


TruckCategory.prototype.preValidate = function () {
    // this method throws errors
    var list = _.flatten(Array.prototype.slice.apply(null,arguments));
    var errors = validate(TruckCategory.getSchema(), list, this);
    if(errors.length > 0){
        throw errors.map(e => (e.stack || String(e))).join('\n\n');  //yummy as ever
    }
};

TruckCategory.prototype.validate = function () {
    // this method does not throw errors, simply returns list of errors
    var list = Object.keys(TruckCategory.getSchema().properties);
    return validate(TruckCategory.getSchema(), list, this);
};


TruckCategory.prototype.toJSON = function toJSON() {

};


module.exports = TruckCategory;