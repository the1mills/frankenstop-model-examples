/**
 * Created by t_millal on 10/8/16.
 */



const assert = require('assert');
const util = require('util');

//returns array of errors, if errors length < 1, it is valid
function validate(schema, model) {

    const errors = [];
    const allowExtraneousProperties = schema.allowExtraneousProperties;

    assert(typeof schema.properties === 'object', ' => Moover fast-fail here => schema does not have a "properties" property.');


    //first go through schema and make sure all required fields are present and of the right type etc.
    (function recurseThroughProperties(schemaProperties, model) {

        Object.keys(schemaProperties).forEach(function (key, index) {

            const schemaProp = schemaProperties[key];
            const modelProp = model[key];

            const isRequired = !!schemaProp.required;

            if (isRequired && !modelProp) {
                errors.push(new Error('required:true for schema property=' + key + ' for model object => \n' + util.inspect(model)));
            }
            else {
                try {
                    assert(typeof modelProp === schemaProp.type, 'Model with these properties => \n' + util.inspect(model) + ', ' +
                        'does not have the right type=' + schemaProp.type + ' for property=' + key);
                }
                catch (err) {
                    errors.push(err);
                }
            }

            if(schemaProp.values){
                Object.keys(schemaProp).forEach(function(key){
                    const prop = schemaProp[key];
                    recurseThroughProperties(schemaProp, prop); //boom this is the bomb
                });
            }

            if (schemaProp.properties) {
                assert(typeof schema.properties === 'object', ' => Moover fast-fail here => schema "properties" ' +
                    'property should be an object type.');
                recurseThroughProperties(schemaProp.properties, modelProp);
            }


        });

    })(schema.properties, model);


    return errors;

}


module.exports = validate;