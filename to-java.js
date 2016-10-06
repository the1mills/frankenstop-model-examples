var print = function(msg) {
    console.log(msg);
};

var toJava = function (obj) {
    var j2j = {
        'number': 'long',
        'string': 'String'
    };
    print('package co.moover.client.moover.models;');
    print('');
    print('import com.google.firebase.database.IgnoreExtraProperties;');
    print('// [START order_class]');
    print('@IgnoreExtraProperties');
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
            var q = '';
            if (t == 'String') {
                q = '"';
            }
            print('    public ' + t + ' ' + field + ' = ' + q + obj[field] + q + ';');
        }
    }
    print('');
    print('    public ' + obj.constructor.name  + '() {');
    print('    };')
    print('};');
    print('// [END order_class]');
    print('');
}

module.exports = {
    'toJava': toJava
};

var moover = require('./moover');
var order = new moover.Order();
toJava(order);
var address = new moover.Address();
toJava(address);
var position = new moover.Position();
toJava(position);
