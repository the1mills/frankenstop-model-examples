//core

//npm
const _ = require('underscore');

//project
const Position = require('./position');
const F = require('frankenstop');


const Address = F.bestow(function (obj, opts) {

    this.addressId = obj.addressId || '???';
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
    F.call(this, opts);

});


Address.prototype.getRef = function () {
    return '/addresses/' + this.addressId;
};


Address.getSchema = function getAddressSchema() {

    return Object.freeze({

        allowExtraneousProperties: false,

        properties: {

            addressId: {
                type: 'uid',
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


module.exports = Address;
