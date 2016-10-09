var print = function () {
    //console.log takes more than one argument ;)
    console.log.apply(this, arguments);
};

//alternatively, Steve you can do this, and call log instead of print
const log = console.log.bind(console);

var toJava = function (obj) {
    var j2j = {
        'number': 'double',
        'string': 'String'
    };
    var name = obj.constructor.name;
    var lcname = name.toLowerCase();
    log('package co.moover.client.moover.models;');
    log('');
    log('import com.google.firebase.database.IgnoreExtraProperties;');
    log('// [START ' + lcname + '_class]');
    log('@IgnoreExtraProperties');
    log('public class ' + name + ' {');
    for (var field in obj) {
        var value = obj[field];
        if (typeof(value) === 'object') {
            if (value != null) {
                var n = value.constructor.name;
                log('    public ' + n + ' ' + field + ' = new ' + n + '();');
            }
        }
        else if (typeof(value) === 'function') {
            // ignore
        }
        else {
            var t = j2j[typeof(value)];
            if (t == null) {
                t = typeof(value);
            }
            var q = '';
            if (t == 'String') {
                q = '"';
            }
            log('    public ' + t + ' ' + field + ' = ' + q + obj[field] + q + ';');
        }
    }
    log('');
    log('    public ' + name + '() {');
    log('    };');
    log('};');
    log('// [END ' + lcname + '_class]');
    log('');
};

module.exports = {
    'toJava': toJava
};

var moover = require('./moover');
var order = new moover.Order({}, false);
var Address = moover.Address;

order.addItem({
    key: 'beluga',
    itemType: 'uid',
    label: 'uid',
    weight: 30,
    visible: true,
    moveTime: 30
});

order.setDropoff({
    floors: 3,
    contactPhone: '3age',
    contactName: 'nancy',
    address: 'some-uid'
    // address: new Address({
    //     geolocation: {
    //         longitude: 30,
    //         latitude: 40
    //     }
    // })
});

order.setPickup({
    floors: 3,
    contactPhone: '3age',
    contactName: 'nancy',
    address: 'some-uid'
});

// order.validate().forEach(function(e){
//     console.log('\n\n',e.stack || e);
// });

toJava(order);
// var address = new moover.Address({});
// toJava(address);
// var position = new moover.Position({});
// toJava(position);
// var ticket = new moover.Ticket({});
// toJava(ticket);
