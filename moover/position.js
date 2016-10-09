
//core


//npm
const _ = require('underscore');

//project
const validate = require('../lib/shared-validation');


function Position(obj, isPreValidate) {

    this.positionId = null;
    this.latitude = obj.latitude || 37.7802809;
    this.longitude = obj.longitude || -122.4197164;

    if (isPreValidate !== false) { //default is to run prevalidation
        //this may throw an error, for purposes of failing-fast for devs
        this.preValidate(Object.keys(this));
    }

}

Position.prototype.getRef = function(){
   return '/positions/' + this.positionId;
};


Position.getSchema = function getSchema() {

    return Object.freeze({

        allowExtraneousProperties: false,

        properties: {

            latitude: {
                type: 'number',
                minValue: -90.000,
                maxValue: 90.0000
            },

            longitude: {
                type: 'number',
                minValue: -180.000,
                maxValue: 180.000
            }
        }


    })


};


Position.prototype.preValidate = function () {
    var list = _.flatten(Array.prototype.slice.call(arguments));
    var errors = validate(Position.getSchema(), list, this);
    if (errors.length > 0) {
        throw errors.map(e => (e.stack || String(e))).join('\n\n');  //yummy as ever
    }
};

Position.prototype.validate = function () {
    var list = Object.keys(Position.getSchema().properties);
    return validate(Position.getSchema(), list, this);
};

Position.prototype.nullify = function () {
    this.latitude = this.longitude = 0.0;
};

Position.prototype.isNull = function () {
    return Math.abs(this.latitude) < 0.0001 && Math.abs(this.longitude) < 0.0001;

};


module.exports = Position;
