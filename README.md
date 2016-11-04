# Usage

```js
const models = require('moover');

// create a model, which has useful methods for validation
const order = new models.Order({});

//explicitly passing false will prevent pre-validation in the constructor
const order = new models.Order({}, false);


// each method on a model will validate the input

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
});

order.setPickup({
    floors: 3,
    contactPhone: '3age',
    contactName: 'nancy',
    address: 'some-uid'
});


//before saving model to the database, you should call:
model.validate();

//however, if you exclusively use the setter methods, the model is most likely valid
//because each setter method validates the input against the model schema

```


TODOS:

1. Billing model?
2. 1:1 relationship between trips and orders?
