

function RoutePoint() {
    if (arguments.length == 0) {
        this.address = '1212 Nowhere Street, Nowherevill, XX 99999';
        this.flights = 1;
        this.elevator = true;
        this.contact_name = 'Steve';
        this.contact_phone = '+1-415-555-1212';
    }
    else {
        throw 'Usage: new RoutePoint()';
    }
}

RoutePoint.prototype.validate = function () {
    if (this.address.length < 1) {
        throw '"address" is not set';
    }
    if (this.flights < 0 || this.flights > 100) {
        throw 'bad "flights" number: ' + this.flights;
    }
    if(typeof(this.elevator) !== "boolean") {
        throw '"elevator" is not boolean ' + this.elevator + ' ' + typeof(this.elevator);
    }
    if (this.contact_name.length < 1) {
        throw '"contact_name" is not set';
    }
    if (this.contact_phone.length < 1) {
        throw '"contact_phone" is not set';
    }
};

module.exports = RoutePoint;