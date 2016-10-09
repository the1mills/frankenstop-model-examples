/**
 * Created by t_millal on 10/8/16.
 */


const suman = require('suman');
const Test = suman.init(module, {});


Test.describe(__filename, function (fs, path, assert) {

    const Order = require('../moover').Order;


    this.describe('test valid json', function () {

        const dir = path.resolve(__dirname, 'fixtures/order-test-data/valid-json');

        const orderData =
            fs.readdirSync(dir).filter(p => String(p).endsWith('.json')).map(p => {
                return JSON.parse(fs.readFileSync(path.resolve(dir, p)));
            });

        orderData.forEach(d => {

            this.it('constructor test', t => {

                const keys = Object.keys(Order.getSchema().properties);
                const errors = new Order(d, false).validate(keys);

                if (errors.length > 0) {
                    console.log(errors.map(e => e.stack).join('\n\n'));
                    throw 'failed';
                }
            });

        });

    });


    this.describe('test in-valid json', function () {

        const dir = path.resolve(__dirname, 'fixtures/order-test-data/invalid-json');

        const orderData =
            fs.readdirSync(dir).filter(p => String(p).endsWith('.json')).map(p => {
                return JSON.parse(fs.readFileSync(path.resolve(dir, p)));
            });

        orderData.forEach(d => {

            this.it('constructor test', t => {

                assert.throws(function () {
                    const keys = Object.keys(Order.getSchema().properties);
                    new Order(d, false).preValidate(keys);

                });

            });

        });

    });


});



