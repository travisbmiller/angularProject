var Mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var q = require('q');

var userSchema = Mongoose.Schema({

    fullName: String,
    firstName: String,
    lastName: String,
    middleName: String,
    perferedName: String,
    gender: String,
    motherMaidenName: String,
    status: String,
    store: String,
    position: String,
    dob: String,
    userRole: String,
    email: {type: String, unique: true},
    password: String,
    onBoardCompleted: {type: Boolean, default: false}, 
    address: String,
    addressDetails: String,
    city: String,
    state: String,
    zip: Number,   
    createAt: { type: Date, required: true, default: Date.now }
})

userSchema.pre('save', function (next) {

    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(12, function (err, salt) {
        
        if (err) return next(err);
        
        bcrypt.hash(user.password, salt, function (err, hash) {
            user.password = hash;
            return next();
        });
    });
});

userSchema.methods.comparePassword = function (password) {

    var deferred = q.defer();

    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err)  {
            deferred.reject(err)
        } else {
            deferred.resolve(isMatch)
        }
    })

    return deferred.promise
};


module.exports = Mongoose.model('User', userSchema);