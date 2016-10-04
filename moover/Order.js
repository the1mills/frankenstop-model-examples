var RoutePoint = require('./RoutePoint');

function Order() {
    if (arguments.length == 0) {
        this.customer = '<customerid>';
        this.loc_start = new RoutePoint();
        this.loc_end = new RoutePoint();
        //this.destination = new RoutePoint();
    }
    else if (arguments.length == 1) {
        var json = arguments[0];
        this.customer = json.customer;
        this.loc_start = json.loc_start;
        this.loc_end = json.loc_end;
    }
    else {
        throw 'Usage: "new Order()" or "new Order(json)"';
    }
    this.validate();
}

Order.prototype.validate = function(){
    if (this.customer.length < 1) {
        throw "customer is not set";
    }
    this.loc_start.validate();
    this.loc_end.validate();
};

var print = function(msg) {
    console.log(msg);
};

Order.prototype.test = function () {
    // default order
    var order  = new Order();
    order.validate();
    print('default Order: ' + JSON.stringify(order));

    // good order
    var good = new Order();
    good.customer = 'steve';
    good.loc_start.address = '42 Anywhere Avenue, Anytown, YY 66666';
    good.loc_start.flights = 0;
    good.loc_start.elevator = false;
    good.loc_start.contact_name = 'Ryan';
    good.loc_start.contact_phone = "+1-650-555-1212";
    good.loc_end = new RoutePoint();
    print('good Order: ' + JSON.stringify(good));

    // bad order
    var didFail = false;
    try {
        var bad = new Object();
        bad['height'] = 25;
        bad['weight'] = 'potato';
        var badorder = new Order(bad);
        badorder.validate();
    }
    catch(err) {
        didFail = true;
    }
    if (!didFail) {
        throw "validation failed on bad data";
    }
};

module.exports = Order;

