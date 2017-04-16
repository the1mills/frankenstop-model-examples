


//core

//npm
const _ = require('underscore');

//project
const F = require('frankenstop');


const Duck = F.bestow(function (obj, opts) {

    this.duckId = '???';
    this.duckTypeId = obj.duckTypeId || '???';
    this.duckSiblings = obj.duckSiblings;
    F.call(this,opts);
});


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



Duck.prototype.toRefPath = function () {
    return '/ducks/' + this.duckId;
};

Duck.prototype.toJSON = function toJSON() {

};

module.exports = Duck;