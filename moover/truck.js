/**
 * Created by t_millal on 10/4/16.
 */


const assert = require('assert');

function Truck(truckTypeId, state){

    this.truckTypeId = truckTypeId;
    this.state = state || {};

}


Truck.prototype.validate = function validate(){

    // validate truckTypeId as Firebase UID
    // validate state has having acceptable properties

};