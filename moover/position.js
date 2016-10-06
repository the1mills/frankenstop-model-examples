var error = require('./error');

function Position() {
    if (arguments.length == 0) {
        this.lat = 37.7802809;
        this.lon = -122.4197164;
    }
    else if (arguments.length == 1) {
        this.lat = json.lat;
        this.lon = json.lon;
    }
    else {
        throw "Usage: new Position() or new Position(latlonjson)";
    }
}

Position.prototype.validate = function () {
    if (this.lat < -90 || this.lat > 90) {
        error.throwError('lat must be < 90 and > -90', 'lat');
    }
    if (this.lon < -180 || this.lon > 180) {
        error.throwError('lon must be < 180 and > -180', 'lon');
    }
};

Position.prototype.nullify = function () {
    this.lat = this.lon = 0.0;
};

Position.prototype.isNull = function () {
    return Math.abs(this.lat) < 0.0001 && Math.abs(this.lon) < 0.0001;
};
module.exports = Position;
