var print = function(msg) {
    console.log(msg);
};

var toJava = function (obj) {
    var j2j = {
        'number': 'long',
        'string': 'String'
    };
    print('// [START order_class]');
    print('public class ' + obj.constructor.name + ' {');
    for (var field in obj) {
        var value = obj[field];
        if (typeof(value) === 'object') {
            if (value != null) {
                var n = value.constructor.name;
                print('    public ' + n + ' ' + field + ' = new ' + n + '();');
            }
        }
        else if (typeof(value) === 'function') {
            // ignore
        }
        else {
            //print('field ' + field + ' type ' + typeof(this[field]));
            var t = j2j[typeof(value)];
            if (t == null) {
                t = typeof(value);
            }
            print('    public ' + t + ' ' + field + ' = "' + obj[field] + '";');
        }
    }
    print('};');
    print('// [END order_class]');
}

module.exports = {
    'toJava': toJava
};

var moover = require('./moover');
var order = new moover.Order();
toJava(order);
var address = new moover.Address();
toJava(address);
