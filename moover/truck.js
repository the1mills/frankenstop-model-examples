/**
 * Created by t_millal on 10/4/16.
 */


const assert = require('assert');

function Truck(obj) {

    this.truckTypeId = obj.truckTypeId;
    this.truckCategoryId = obj.truckCategoryId;

    this.truckMaintenanceState = obj.truckMaintenanceState || {};

    this.licensePlateNumber = obj.licensePlateNumber;
    this.registrationInfo = obj.registrationInfo;

}


Truck.prototype.validate = function validate() {

    // validate truckTypeId as Firebase UID
    // validate state has having acceptable properties

};


Truck.prototype.toJSON = function toJSON() {

};