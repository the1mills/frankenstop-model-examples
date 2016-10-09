/**
 * Created by t_millal on 10/8/16.
 */



const assert = require('assert');
const util = require('util');

//returns array of errors, if errors length < 1, it is valid
function validate(schema, propertiesList, model) {

    const errors = [];

    //TODO: validate that no extraneous properties exist
    const allowExtraneousProperties = !!schema.allowExtraneousProperties;

    if (!allowExtraneousProperties) {

        (function recurseThroughObjectProperties(m, s) {

            Object.keys(m).forEach(function (k) {

                var subModel = m[k];
                var subSchema = s[k];

                try {
                    assert(k in s, 'Schema or sub-schema with value => \n\n ' + util.inspect(s) + '\n\n\n does not have key = "' + k + '", ' +
                        'but this key is in model/sub-model => \n\n' + util.inspect(m) + '\n\n => for model with value => \n\n' + util.inspect(model));

                    if (typeof subSchema !== 'object') {
                        //this is simply for schema formatting validation
                        throw new Error('Schema is not formatted correctly => ' + util.inspect(s));
                    }

                    // if (subSchema.type === 'object') {

                    // console.log(subModel);

                    if (typeof  subModel === 'object') {

                        assert(subSchema.type === 'object', 'subModel is an object, but subSchema.type is not "object" => ' +
                            '\n\n => for subModel with value => \n\n' + util.inspect(subModel) + '\n\n => for model with value => \n\n' +
                            util.inspect(model));

                        var hasProperties = typeof subSchema.properties === 'object';
                        var hasValues = typeof subSchema.values === 'object';


                        if (hasProperties && hasValues) {
                            throw new Error('schema/sub-schema with value => \n\n' + util.inspect(subSchema) +
                                '\n\nhas both a "properties" or "values" object attached (cannot have both).');
                        }
                        else if (hasProperties) {
                            if (subModel) {
                                recurseThroughObjectProperties(subModel, subSchema.properties);
                            }
                        }
                        else if (hasValues) {
                            if (subModel) {
                                assert(typeof subModel === 'object', 'In this case, subModel should be an "object" type.');
                                Object.keys(subModel).forEach(function (k) {
                                    recurseThroughObjectProperties(subModel[k], subSchema.values.properties);
                                });
                            }

                        }
                        else {
                            throw new Error('schema/sub-schema with value => \n\n' + util.inspect(s[k]) +
                                '\n\ndoes not have a "properties" or "values" object attached.');
                        }

                    }

                }
                catch (err) {
                    errors.push(err);
                }
            });


        })(model, schema.properties)
    }


    //copy over only the properties we wish to validate, in effect creating a subschema
    const initialProperties = {};
    Object.keys(schema.properties).filter(i => propertiesList.indexOf(i) > -1).forEach(key => {
        initialProperties[key] = schema.properties[key];
    });

    assert(typeof schema.properties === 'object', ' => Moover fast-fail here => schema does not have a "properties" property.');

    //first go through schema and make sure all required fields are present and of the right type etc.
    (function recurseThroughProperties(schemaProperties, model) {

        Object.keys(schemaProperties).forEach(function (key, index) {

            const schemaProp = schemaProperties[key];
            const modelProp = model[key];


            // console.log('schemaProp =>', util.inspect(schemaProp));
            // console.log('modelProp => ', util.inspect(modelProp));

            const isRequired = !!schemaProp.required;

            if (isRequired && !modelProp) {
                errors.push(new Error('required:true for schema property=' + key + ' for model object => \n' + util.inspect(model)));
                //nothing more we can do if modelProp is null/undefined, so we return
                return;
            }

            try {  //place all assertions in this try/catch

                assert(!(('values' in schemaProp) && ('properties' in schemaProp)), 'schemaProp given by =>' + util.inspect(schemaProp) + ' has both "properties" and "values" properties, ' +
                    'this is not allowed. This regards the following schema => ' + util.inspect(schema));

                assert(schemaProp.type, 'schemaProp given by => \n' +
                schemaProp === undefined ? schemaProp : util.inspect(schemaProp) +
                'does not have a "type" property defined, please fix pronto.');


                if (schemaProp.type === 'object') {
                    assert(typeof schemaProp.properties === 'object' || typeof schemaProp.values === 'object',
                        'If schemaProp.type is an object, then you must define a "properties" property on the schemaProp ' +
                        'which describes the properties => \n\n the problem is in the following schemaProp => \n\n' + util.inspect(schemaProp)
                        + '\n\n for key="' + key + '" in parent object => \n\n' + util.inspect(schemaProperties)
                        + '\n\nfor schema => ' + util.inspect(schema));
                }

                if (schemaProp.type === 'uid') {
                    if (typeof  modelProp !== 'string') {
                        throw new Error('Model with these properties => \n' + util.inspect(model) + ', ' +
                            'does not have the right type=' + schemaProp.type + ' for property=' + key)
                    }
                }
                else if (schemaProp.type === 'date') {
                    //TODO: need to parse date in string to see if it's valid
                    if (typeof  modelProp !== 'string') {
                        throw new Error('Model with these properties => \n' +
                            (model === undefined ? '(undefined)' : util.inspect(model)) + ', ' +
                            'does not have the right type=' + schemaProp.type + ' for property=' + key)
                    }

                    var d = new Date(modelProp);
                    if (isNaN(d.getTime())) {
                        //date is invalid
                        throw new Error('The following value for key = "' + key +'" => value => ' + util.inspect(modelProp) + ' is an invalid date, on model/sub-model => \n\n' +
                            util.inspect(model));
                    }
                }
                else {
                    assert(typeof modelProp === schemaProp.type, 'Model with these properties => \n' + util.inspect(model) + ', ' +
                        'does not have the right type=' + schemaProp.type + ' for property=' + key);
                }

            }
            catch (err) {
                errors.push(err);
            }


            if (schemaProp.values) {  //ask alex how this works vs. schemaProp.properties

                // Object.keys(schemaProp).forEach(function (key) {
                //     const prop = schemaProp[key];
                //     recurseThroughProperties(schemaProp, prop); //boom this is the bomb
                // });

                if (!schemaProp.values.properties) {
                    throw new Error('You must define "schemaProp.values.properties" for the following schemaProp => \n\n' + util.inspect(schemaProp) +
                        '\n\n for the following schema => \n' + util.inspect(schema));
                }

                Object.keys(modelProp).forEach(function (key) {
                    const m = modelProp[key];
                    recurseThroughProperties(schemaProp.values.properties, m); //boom this is the bomb
                });

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