//core

//npm
const _ = require('underscore');

//project
const validate = require('../lib/shared-validation');


function Ticket(obj) {

    this.orderId = obj.orderId || '<orderId>';
    this.customer = obj.customer || '<customer>';

    this.preValidate(['orderId', 'customer']);
}

Ticket.getSchema = function getTicketSchema() {

    return {

        allowExtraneousProperties: false,

        properties: {

            orderId: {
                type: 'uid',
                require: true
            },

            customer: {
                type: 'string',
                required: true

            }
        }
    }

};


Ticket.prototype.preValidate = function () {
    var list = _.flatten(Array.prototype.slice.apply(null, arguments));
    var errors = validate(Ticket.getSchema(), list, this);
    if (errors.length > 0) {
        throw errors.map(e => (e.stack || String(e))).join('\n\n');  //yummy as ever
    }
};


Ticket.prototype.validate = function () {
    //this should not throw an error, simply return list of validation errors
    var list = Object.keys(Ticket.getSchema().properties);
    return validate(Ticket.getSchema(), list, this);
};

Ticket.prototype.toRefPath = function () {
    return '/order' + this.customer + '/job' + this.orderId;
};

module.exports = Ticket;
