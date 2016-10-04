/**
 * Created by sca on 10/3/16.
 */

function Order(json) {
    if (json == null) {
        throw "TODO - default constructor";
    }
    this.customer = json.customer;
}

