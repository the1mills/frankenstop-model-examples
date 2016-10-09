/**
 * Created by t_millal on 10/4/16.
 */


//core

//npm
const _ = require('underscore');

//project
const validate = require('../lib/shared-validation');


function Duck(obj, isPreValidate) {

    this.duckId = '???';
    this.duckTypeId = obj.duckTypeId || '???';
    this.duckSiblings = obj.duckSiblings;

    //this may throw an error, for purposes of failing-fast for devs
    if (isPreValidate !== false) {
        this.preValidate(['duckId']);
    }

}


Duck.getSchema = function getDuckSchema() {

    return Object.freeze({

        allowExtraneousProperties: false,

        properties: {

            duckId: {
                type: 'uid',
                primaryKey: true,
                required: false
            },

            duckTypeId: {
                type: 'uid',
                required: false
            },

            duckSiblings: {
                type: 'array',
                required: true,
                elements: {
                    minLength: null,
                    maxLength: 100,
                    properties: {
                        colors: {
                            type: 'string',
                            required: false
                        },
                        eatsBugs: {
                            type: 'boolean',
                            required: true
                        },
                        children: {
                            type: 'array',
                            required: true,
                            elements: {
                                properties: {
                                    colors: {
                                        type: 'string',
                                        required: false
                                    },
                                    eatsBugs: {
                                        type: 'boolean',
                                        required: true
                                    },
                                    children: {
                                        type: 'array',
                                        required: true,
                                        elements: {
                                            properties: {
                                                colors: {
                                                    type: 'string',
                                                    required: false
                                                },
                                                eatsBugs: {
                                                    type: 'boolean',
                                                    required: true
                                                }
                                            }

                                        }
                                    }
                                }

                            }
                        }
                    }

                }

            }


        }
    })

};


Duck.prototype.preValidate = function () {
    var list = _.flatten(Array.prototype.slice.apply(null, arguments));
    var errors = validate(Duck.getSchema(), list, this);
    if (errors.length > 0) {
        throw errors.map(e => (e.stack || String(e))).join('\n\n');  //yummy as ever
    }
};

Duck.prototype.validate = function () {
    //this should not throw an error, simply return list of validation errors
    var list = Object.keys(Duck.getSchema().properties);
    return validate(Duck.getSchema(), list, this);
};


Duck.prototype.toRefPath = function () {
    return '/ducks/' + this.duckId;
};

Duck.prototype.toJSON = function toJSON() {

};

module.exports = Duck;