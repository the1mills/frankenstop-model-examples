//core

//npm
const _ = require('underscore');

//project
var Position = require('./position');
var validate = require('../lib/shared-validation');


function Address(obj, isPreValidate) {

    this.addressId = obj.addressId || null;
    this.addressString = obj.addressString || '1212 Nowhere Street, Nowhereville, XX 99999';
    this.flights = obj.flights || 0;
    this.hasElevator = !!obj.hasElevator;
    this.contactName = obj.contactName;
    this.contactPhone = obj.contactPhone;
    this.geolocation = new Position(obj.geolocation);
    this.addressNumber = obj.addressNumber;
    this.streetName = obj.streetName;
    this.city = obj.city;
    this.zipcode = obj.zipcode;
    this.country = obj.country;
    this.stateOrRegion = obj.stateOrRegion;

    this.addressString = this.constructAddressString();

    //TODO: call parseAddressString(this);  //make sure address string is parseable?

    // NOTE! Not all validation can happen in the constructor, validation should mostly happen in validate() method,
    // which will be called on front-end before saving to DB, and in backend.

    // this may throw an error, for purposes of failing-fast for devs
    if(isPreValidate !== false){
        this.preValidate(Object.keys(this));
    }

}

Address.prototype.getRef = function(){
     return '/addresses/' + this.addressId;
};


Address.getSchema = function getAddressSchema() {

    return Object.freeze({

        allowExtraneousProperties: false,

        properties: {

            addressId: {
                type: 'string',
                required: false,
                primaryKey: true
            },

            addressString: {
                type: 'string',
                required: true,
                minLength: 10,
                maxLength: 300
            },

            addressNumber: {
                type: 'integer',
                required: true
            },

            streetName: {
                type: 'string',
                required: true
            },

            city: {
                type: 'string',
                required: true
            },

            zipcode: {
                type: 'string',   //some zips have dashes,
                required: true
            },

            stateOrRegion: {
                type: 'string',
                required: true
            },

            country: {
                type: 'string',
                required: true
            },

            flights: {
                type: 'integer',
                required: true,
                minVal: 0,
                maxVal: 120
            },
            hasElevator: {
                type: 'boolean',
                required: true
            },
            contactName: {
                type: 'string',
                required: true,
                minLength: 5,
                maxLength: 50
            },
            contactPhone: {
                type: 'string',
                required: true,
                minLength: 10,
                maxLength: 30
            },

            geolocation: {
                type: 'object',
                required: true,
                properties: {
                    latitude: {
                        type: 'number',
                        required: true
                    },
                    longitude: {
                        type: 'number',
                        required: true
                    }
                }

            }
        }

    })

};


Address.prototype.constructAddressString = function () {
    return [this.addressNumber + ' ' + this.streetName,
        this.city, this.stateOrRegion, this.zipcode, this.country].join(', ');

};


Address.prototype.preValidate = function () {
    // this method throws error(s), for dev experience, not user experience
    var list = _.flatten(Array.prototype.slice.call(arguments));
    var errors = validate(Address.getSchema(), list, this);
    if (errors.length > 0) {
        throw errors.map(e => (e.stack || String(e))).join('\n\n');  //yummy as ever
    }
};

Address.prototype.validate = function () {
    // this method does not throw errors, simply returns list of errors
    var list = Object.keys(Address.getSchema().properties);
    return validate(Address.getSchema(), list, this);
};


module.exports = Address;
