var Form = require('../models/formTemplateModel')

module.exports = {
    
    create: function (req, res) {

        var newFormTemplate = new Form(req.body);

        newFormTemplate.save(function (err, form) {
            if (err) return res.status(500).json(err);
                 return res.status(200).json(form)
            });
    },

    get: function (req, res) {
        Form.find({}, function (err, forms) {
            if (err) return res.status(500).json(err);
                return res.status(200).json(forms)
        })
    },

    getOne: function (req, res) {
        var id = req.params.id;
        Form.findById(id).exec(function (err, form) {
            if (err) return res.status(500).json(err)
                res.status(200).json(form)
        })
    }
 
}