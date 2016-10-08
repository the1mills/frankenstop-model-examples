const assert = require('assert');
const validate = require('../lib/shared-validation');

function ItemType(obj) {

    this.itemTypeId = '???';
    this.numberOfMooversNeeded = obj.numberOfMooversNeeded;
    this.dimensions = obj.dimensions;

    this.preValidate(['numberOfMooversNeeded','dimensions']);

}

ItemType.getSchema = function getSchema() {

    return {

        properties: {

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
    }

};


ItemType.prototype.toJSON = function toJSON() {

};


ItemType.prototype.preValidate = function validate(list) {
    var errors;
    if (errors = validate(ItemType.getSchema(), list, this) && errors.length > 0) {
        throw errors.map(e => (e.stack || String(e))).join('\n\n');  //yummy as ever
    }
};

ItemType.prototype.validate = function validate() {
    var list = Object.keys(ItemType.getSchema().properties);
    return validate(ItemType.getSchema(), list, this);
};


module.exports = ItemType;