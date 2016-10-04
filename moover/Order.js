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
        this.loc_start = new RoutePoint(json.loc_start);
        this.loc_end = new RoutePoint(json.loc_end);
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
    print('testing Order');
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
    var failBad = null;
    var bad = new Object();
    try {
        bad['height'] = 25;
        bad['weight'] = 'potato';
        var badorder = new Order(bad);
        badorder.validate();
    }
    catch(err) {
        failBad = err;
    }
    if (failBad) {
        print('validate detected bad input: ' + JSON.stringify(bad));
    }
    else {
        throw "validation failed on bad data";
    }

    // good JSON
    var goodJson = JSON.parse('{"customer":"steve","loc_start":{"address":"42 Anywhere Avenue, Anytown, YY 66666","flights":0,"elevator":false,"contact_name":"Ryan","contact_phone":"+1-650-555-1212"},"loc_end":{"address":"1212 Nowhere Street, Nowhereville, XX 99999","flights":1,"elevator":true,"contact_name":"Steve","contact_phone":"+1-415-555-1212"}}');
    var goodOrder = new Order(goodJson);
    print('goodJson: ' + JSON.stringify(goodOrder));

    // bad JSON
    var badJson = JSON.parse('{"customer":"steve","loc_start":{"address":"42 Anywhere Avenue, Anytown, YY 66666","flights":0,"elevator":"random","contact_name":"Ryan","contact_phone":"+1-650-555-1212"},"loc_end":{"address":"1212 Nowhere Street, Nowhereville, XX 99999","flights":1,"elevator":true,"contact_name":"Steve","contact_phone":"+1-415-555-1212"}}');
    var badJsonError = null;
    try {
        var badJsonOrder = new Order(badJson);
        print('badJsonOrder: ' + badJsonOrder);
    }
    catch(err) {
        badJsonError = err;
    }
    if (badJsonError) {
        print('validate detected bad json: ' + JSON.stringify(badJson));
    }
    else {
        throw "validation failed on bad json";
    }

    /*
    // bad order
    var badJson = "{"
    var jbad = new Object();
    try {
        bad['height'] = 25;
        bad['weight'] = 'potato';
        var badorder = new Order(bad);
        badorder.validate();
    }
    catch(err) {
        failBad = err;
    }
    */
    print('Order test finished');
};

module.exports = Order;

