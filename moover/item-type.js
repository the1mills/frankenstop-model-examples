//core

//npm
const _ = require('underscore');

//project
const validate = require('../lib/shared-validation');


function ItemType(obj, isPreValidate) {

    this.itemTypeId = '???';
    this.numberOfMooversNeeded = obj.numberOfMooversNeeded;
    this.dimensions = obj.dimensions;

    if(isPreValidate !== false){
        this.preValidate(['numberOfMooversNeeded', 'dimensions']);
    }
}

ItemType.getSchema = function getSchema() {

    return Object.freeze({

        properties: {

            itemTypeId: {
                type: 'uid',
                required: true,
                primaryKey: true
            },

            numberOfMooversNeeded: {
                type: 'integer',
                required: true
            },

            dimensions: {
                type: 'object',
                required: true,
                properties: {
                    minHeight: {
                        type: 'number',
                        required: true
                    },
                    maxHeight: {
                        type: 'number',
                        required: true
                    },
                    minWidth: {
                        type: 'number',
                        required: true
                    },
                    maxWidth: {
                        type: 'number',
                        required: true
                    },
                    minLength: {
                        type: 'number',
                        required: true
                    },
                    maxLength: {
                        type: 'number',
                        required: true
                    }
                }
            }


        }
    })

};


ItemType.prototype.toJSON = function toJSON() {

};


ItemType.prototype.preValidate = function () {
    var list = _.flatten(Array.prototype.slice.apply(null, arguments));
    var errors = validate(ItemType.getSchema(), list, this);
    if (errors.length > 0) {
        throw errors.map(e => (e.stack || String(e))).join('\n\n');  //yummy as ever
    }
};

ItemType.prototype.validate = function () {
    var list = Object.keys(ItemType.getSchema().properties);
    return validate(ItemType.getSchema(), list, this);
};


module.exports = ItemType;