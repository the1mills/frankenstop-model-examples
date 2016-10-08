

var {

    Order,
    ItemType,
    Position,
    Ticket,
    Truck,
    TruckType,
    TruckCategory

} = require('../moover');



new Order({

    pickup: {

    }


}).preValidate(Object.keys(Order.getSchema().properties));