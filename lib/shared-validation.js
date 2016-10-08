/**
 * Created by t_millal on 10/8/16.
 */



const assert = require('assert');
const util = require('util');

//returns array of errors, if errors length < 1, it is valid
function validate(schema, propertiesList, model) {

    const errors = [];

    //TODO: validate that no extraneous properties exist
    const allowExtraneousProperties = schema.allowExtraneousProperties;

    console.log('schema.properties => ', '\n', util.inspect(schema.properties));
    console.log('properties list =>', propertiesList);
    console.log('initial model =>', '\n', util.inspect(model));

    const initialProperties = {};
    Object.keys(schema.properties).filter(i => propertiesList.indexOf(i) > -1).forEach(key => {
        initialProperties[key] = schema.properties[key];
    });


    console.log('initialProperties => ', '\n', util.inspect(initialProperties));

    assert(typeof schema.properties === 'object', ' => Moover fast-fail here => schema does not have a "properties" property.');

    //first go through schema and make sure all required fields are present and of the right type etc.
    (function recurseThroughProperties(schemaProperties, model) {

        Object.keys(schemaProperties).forEach(function (key, index) {

            const schemaProp = schemaProperties[key];
            const modelProp = model[key];


            console.log('schemaProp =>', util.inspect(schemaProp));
            console.log('modelProp => ', util.inspect(modelProp));

            const isRequired = !!schemaProp.required;

            if (isRequired && !modelProp) {
                errors.push(new Error('required:true for schema property=' + key + ' for model object => \n' + util.inspect(model)));
            }
            else {
                try {
                    assert(schemaProp.type, 'schemaProp does not have a "type" property defined, please fix pronto.');
                    assert(typeof modelProp === schemaProp.type, 'Model with these properties => \n' + util.inspect(model) + ', ' +
                        'does not have the right type=' + schemaProp.type + ' for property=' + key);
                }
                catch (err) {
                    errors.push(err);
                }
            }

            if (schemaProp.values) {  //ask alex how this works vs. schemaProp.properties
                // Object.keys(schemaProp).forEach(function (key) {
                //     const prop = schemaProp[key];
                //     recurseThroughProperties(schemaProp, prop); //boom this is the bomb
                // });


            }

            if (schemaProp.properties) {
                assert(typeof schema.properties === 'object', ' => Moover fast-fail here => schema "properties" ' +
                    'property should be an object type.');
                recurseThroughProperties(schemaProp.properties, modelProp);
            }


        });

    })(
        initialProperties, //only validate properties in list
        model
    );


    return errors;

}


module.exports = validate;