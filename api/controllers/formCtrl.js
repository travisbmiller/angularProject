var Form = require('../models/formModel')

module.exports = {
    create: function (req, res) {

        

        var obj = {
            name: req.body.name,
            inputs: req.body.inputs,
            user: req.user._id,
            currentStatus: "Submitted",
            actions: 
                {
                    kind: "Submitted",
                    by: req.user._id,
                    date: new Date(),
                    inputs: req.body.inputData
                },
            pastActions: []
        }

        var newForm = new Form(obj);


        newForm.save(function (err, form) {
            if (err) return res.status(500).json(err);
                 return res.status(200).json(form)
            });
    },
    getOpenFormsById: function (req, res) {

        var id = req.params.id

        Form.find({user: id})

        .populate('user', 'firstName lastName')
        .populate('form')
        .populate('actions.by')
        .exec(function (err, user) {
            if (err) return res.status(500).json(err)
                res.status(200).json(user)
        })
    }
}