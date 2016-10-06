var Address = require('./address');
var Position = require('./position');
var error = require('./error');

function Order() {
    if (arguments.length == 0) {
        this.orderId = '<orderId>';
        this.customer = '<customerid>';
        this.loc_start = new Address();
        this.loc_end = new Address();
        this.distance = 30;
        this.hours_driving = 2;
        this.hours_labor = 1;
        this.price = 80.49;
        this.pos = new Position();
        this.time_start = '/2016-12-25/1000';
        this.time_end = '/2016-12-25/1400';
        this.status = 'submitted';
        
    }
    else if (arguments.length == 1) {
        var json = arguments[0];
        this.customer = json.customer;
        this.loc_start = new Address(json.loc_start);
        this.loc_end = new Address(json.loc_end);
        this.distance = json.distance;
        this.hours_driving = json.hours_driving;
        this.hours_labor = json.hours_labor;
        this.price = json.price;
        this.pos = new Position(json.position);
        this.time_start = json.time_start;
        this.time_end = json.time_end;
        this.status = json.status;
    }
    else {
        throw 'Usage: "new Order()" or "new Order(json)"';
    }
    this.pos.nullify();
    var now = new Date();
    this.tz = now.toString().match(/\(([A-Za-z\s].*)\)/)[1]; // TODO get this from address
    this.update_time= now.getTime();
    this.errorState = null;
    this.validate();
}

var print = function(msg) {
    console.log(msg);
};

Order.prototype.validate = function(){
    if (this.customer.length < 1) {
        error.throwError('customer is not set', 'customer');
    }
    if (this.distance < 0 || this.distance > 1000.0) {
        error.throwError('distance must be a number >= 0 and < 1000', 'distance');
    }
    if (this.hours_driving < 0 || this.hours_driving > 1000.0) {
        error.throwError('hours_driving must be a number >= 0 and < 1000', 'hours_driving');
    }
    if (this.hours_labor < 0 || this.hours_labor > 1000.0) {
        error.throwError('hours_labor must be a number >= 0 and < 1000', 'hours_labor');
    }
    if (this.price < 0 || this.price > 1000.0) {
        error.throwError('price must be a number >= 0 and < 1000', 'price');
    }
    if (!(this.status && typeof(this.status) === 'string')) {
        error.throwError('status must be a nonempty string', 'status');
    }
    if (!(this.tz && typeof(this.time_start) === 'string')) {
        error.throwError('time_start must be a nonempty string', 'time_start');
    }
    if (!(this.tz && typeof(this.time_end) === 'string')) {
        error.throwError('time_end must be a nonempty string', 'time_end');
    }
    if (!(this.tz && typeof(this.tz) === 'string')) {
        error.throwError('tz must be a nonempty string', 'tz');
    }
    if (this.update_time < 1475784667000) {
        error.throwError('update_time must be a number > 1475784667000', 'update_time');
    }

    try {
        this.loc_start.validate();
        this.loc_end.validate();
        this.pos.validate();
    }
    catch (e) {
        print('error ' + typeof(e) + ' ' + e);
        throw e;
    }
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
    good.loc_end = new Address();
    print('good Order: ' + JSON.stringify(good));

    // bad order
    var failBad = null;
    var bad = {};
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
    var goodJson = JSON.parse('{"customer":"steve","errorState":null,"loc_start":{"address":"42 Anywhere Avenue, Anytown, YY 66666","flights":0,"elevator":false,"contact_name":"Ryan","contact_phone":"+1-650-555-1212"},"loc_end":{"address":"1212 Nowhere Street, Nowhereville, XX 99999","flights":1,"elevator":true,"contact_name":"Steve","contact_phone":"+1-415-555-1212"}}');
    var goodOrder = new Order(goodJson);
    print('goodJson: ' + JSON.stringify(goodOrder));

    // bad JSON
    var badJson = JSON.parse('{"customer":"steve","errorState":null,"loc_start":{"address":"42 Anywhere Avenue, Anytown, YY 66666","flights":0,"elevator":"random","contact_name":"Ryan","contact_phone":"+1-650-555-1212"},"loc_end":{"address":"1212 Nowhere Street, Nowhereville, XX 99999","flights":1,"elevator":true,"contact_name":"Steve","contact_phone":"+1-415-555-1212"}}');
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

    print('Order test finished');
};

module.exports = Order;

