
var User = require('../models/userModel')

module.exports = {

    create: function (req, res) {
        
        var newUser = new User(req.body);
        newUser.addresses = req.body.addresses
        
        newUser.save(function(err, user) {
            if (err) return res.status(400).json(err);
            return res.status(200).json(user);
        });
    },

    getUser: function (req, res) {
        var id = req.params.id
        User.findById(id).exec(function (err, user) {
            if (err) return res.status(500).json(err)
                res.status(200).json(user)
        })
    },

    getUsers: function (req, res) {
        console.log(req.user)
        User.find( { store: { $in: req.user.stores } } )
        .exec(function (err, users) {
            if (err) return res.status(500).json(err)
                res.status(200).json(users)
        })
    },

    update: function (req, res) {
        var user = req.params.id;
        delete req.body._id
        
        User.findOneAndUpdate({_id: user}, req.body, function (err, results) {
            if (err) return res.status(500).json(err)
                return res.status(200).json(results)
        })
    }




}