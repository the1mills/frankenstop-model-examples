/**
 * Created by t_millal on 10/8/16.
 */


const suman = require('suman');
const Test = suman.init(module, {});


Test.describe(__filename, function (fs, path, assert) {

    const Duck = require('../moover/bs-test-model');

    this.describe('test valid json', function () {

        const dir = path.resolve(__dirname, 'fixtures/bs-test-model-data/valid-json');

        const duckData =
            fs.readdirSync(dir).filter(p => String(p).endsWith('.json')).map(p => {
                return JSON.parse(fs.readFileSync(path.resolve(dir, p)));
            });

        duckData.forEach(d => {

            console.log('data:', d);

            this.it('constructor test', t => {

                const keys = Object.keys(Duck.getSchema().properties);
                const errors = new Duck(d, false).validate(keys);

                if (errors.length > 0) {
                    console.log(errors.map(e => e.stack).join('\n\n'));
                    throw 'failed';
                }
            });

        });

    });


    this.describe('test in-valid json', function () {

        const dir = path.resolve(__dirname, 'fixtures/bs-test-model-data/invalid-json');

        const duckData =
            fs.readdirSync(dir).filter(p => String(p).endsWith('.json')).map(p => {
                return JSON.parse(fs.readFileSync(path.resolve(dir, p)));
            });

        duckData.forEach(d => {

            this.it('constructor test', t => {

                assert.throws(function () {
                    const keys = Object.keys(Duck.getSchema().properties);
                    new Duck(d, false).preValidate(keys);

                });

            });

        });

    });


});



