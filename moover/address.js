var Position = require('./position');
var validate = require('../lib/shared-validation');

function Address(obj) {

    this.addressString = obj.addressString || '1212 Nowhere Street, Nowhereville, XX 99999';
    this.flights = obj.flights || 0;
    this.elevator = !!obj.elevator;
    this.contactName = obj.contactName;
    this.contactPhone = obj.contactPhone;
    this.geolocation = new Position(obj.geolocation);

    //TODO: call parseAddressString(this);  //make sure address string is parseable?

    //NOTE! Not all validation can happen in the constructor, validation should mostly happen in validate() method,
    //which will be called on front-end before saving to DB, and in backend.

    //validate anything here that needs to be validated in the constructor
    this.preValidate(['flights', 'elevator']);
}


Address.getSchema = function getAddressSchema() {

    return {

        allowExtraneousProperties: false,

        properties: {

            addressString: {
                type: 'string',
                required: true,
                minLength: 10,
                maxLength: 300
            },
            flightsOfStairs: {
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

    }

};


Address.prototype.preValidate = function (list) {
    // this method throws error(s), for dev experience, not user experience
    var errors;
    if (errors = validate(Address.getSchema(), list, this) && errors.length > 0) {
        throw errors.map(e => (e.stack || String(e))).join('\n\n');  //yummy as ever
    }
};

Address.prototype.validate = function () {
    // this method does not throw errors, simply returns list of errors
    var list = Object.keys(Address.getSchema().properties);
    return validate(Address.getSchema(), list, this);
};


module.exports = Address;
