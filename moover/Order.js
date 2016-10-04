/**
 * Created by sca on 10/3/16.
 */

function Order(json) {
    if (json == null) {
        this.customer = "<customerid>";
    }
    else {
        this.customer = json.customer;
    }

    this.validate = function(){
        if (!this.customer) {
            throw "customer is not set";
        }
    };
}

