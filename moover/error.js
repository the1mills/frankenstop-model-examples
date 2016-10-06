

function Error(msg, field) {
    this.error_msg = msg;
    this.error_field = field;
}

var throwError = function (msg, field) {
    var e = new Error(msg, field);
    throw e;
};

module.exports = { 'Error': Error, 'throwError': throwError };