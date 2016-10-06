var error = require('./error');

function Address() {
    if (arguments.length == 0) {
        this.address = '1212 Nowhere Street, Nowhereville, XX 99999';
        this.flights = 1;
        this.elevator = true;
        this.contact_name = 'Steve';
        this.contact_phone = '+1-415-555-1212';
    }
    else if (arguments.length == 1) {
        var json = arguments[0];
        this.address = json.address;
        this.flights = json.flights;
        this.elevator = json.elevator;
        this.contact_name = json.contact_name;
        this.contact_phone = json.contact_phone;
    }
    else {
        throw 'Usage: new Address()';
    }
}

Address.prototype.throwError = function (field, error_msg) {
    throw error_msg
};

Address.prototype.validate = function () {
    if (this.address.length < 1) {
        error.throwError('address', '"address" is not set');
    }
    if (this.flights < 0 || this.flights > 100) {
        error.throwError('flights', 'bad "flights" number: ' + this.flights);
    }
    if(typeof(this.elevator) !== "boolean") {
        error.throwError('elevator', '"elevator" is not boolean ' + this.elevator + ' ' + typeof(this.elevator));
    }
    if (this.contact_name.length < 1) {
        error.throwError('contact_name', '"contact_name" is not set');
    }
    if (this.contact_phone.length < 1) {
        error.throwError('contact_phone', '"contact_phone" is not set');
    }
};

module.exports = Address;
