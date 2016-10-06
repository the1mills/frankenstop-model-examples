var error = require('./error');

function Ticket() {
    if (arguments.length == 0) {
        this.customer = '<customer>';
        this.orderId = '<orderId>';
    }
    else if (arguments.length == 1) {
        var order = arguments[0];

        this.orderId = order.orderId;
        this.customer = order.customer;
    }
    else {
        throw "Usage: new Ticket() or new Ticket(latlonjson)";
    }
}

Ticket.prototype.validate = function () {
    if (!this.customer) {
        error.throwError('customer must not be empty', 'customer');
    }
    if (!this.orderId) {
        error.throwError('orderId must not be empty', 'orderId');
    }
};

Ticket.prototype.toPath = function () {
    var path = '/order' + this.customer + '/job' + this.orderId;
    return path;
};

module.exports = Ticket;
