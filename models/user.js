var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// https://www.npmjs.com/package/passport-local-mongoose
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    admin:   {
        type: Boolean,
        default: false
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
