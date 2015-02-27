var Express = require('express'),
        Session = require('express-session'),
        Passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy;
        BodyParser = require('body-parser');
        Mongoose = require('mongoose');

var App = Express(),
    port = 9001;


// Controllers -----------------------
var EmployeeCtrl = require('./api/controllers/employeeCtrl')
var NoteCtrl = require('./api/controllers/noteCtrl')
var User = require('./api/models/userModel');
var FormCtrl = require('./api/controllers/formCtrl');
var FormTemplateCtrl = require('./api/controllers/formTemplateCtrl');

// Mongoose Contection ---------------
Mongoose.connect('mongodb://localhost/hr');


// Passport --------------------------


Passport.use(new LocalStrategy ({
    usernameField: 'email',
    passwordField: 'password'
}, function (username, password, done) {

    User.findOne({email: username}).exec().then(function (user) {
        if (!user) {
            return done(null, false);
        }
        user.comparePassword(password).then(function (isMatch) {
            if (!isMatch) {
                return done(null, false);
            }
            return done(null, user);
        });
    });
}));

Passport.serializeUser(function(user, done) {
  done(null, user);
});

Passport.deserializeUser(function(obj, done) {
    done(null, obj);
});





// Middleware ------------------------

App.use(Express.static(__dirname+'/public'));
App.use(BodyParser.json());
App.use((Session({
    secret: "kdkdksaoadmn32"
})))

App.use(Passport.initialize());
App.use(Passport.session());

var isAuthised = function (req, res, next) {
    if (req.isAuthenticated()) return next();
    res.status(401).end()
    // res.redirect('/');
}

var logOutLogIn = function (req, res, next){
    if(req.body.logInLogOut){
        req.logout();
    }
    next();
}

var isAdmin = function (req, res, next) {
    if (req.isAuthenticated() && req.user.userRole === "Admin") return next();
    res.status(401).end()
}


// Api Routes ------------------------


App.post('/api/auth', logOutLogIn, Passport.authenticate('local'), function (req, res) {
    return res.status(200).json(req.user)
});

App.get("/api/logout", function (req, res) {
    req.logout();
    res.redirect('/');
})

// App.get("/api/logout_login/:email", function (req, res) {
//     // logout current user
//     req.logout();




//     res.redirect('/');
// })

// app.get('/', function(req, res){
//     res.sendFile('login.html');
// })

// app.get("/app", isAuthed, Express.static(__dirname + "/public"))



App.post('/api/employee', EmployeeCtrl.create)
App.put('/api/employee/:id', EmployeeCtrl.update)
App.get('/api/employee/:id', EmployeeCtrl.getUser)

App.post('/api/employees', EmployeeCtrl.getUsers)

App.post('/api/addnote', NoteCtrl.addNote)
App.get('/api/getnotes/:id', NoteCtrl.getNotes)
App.get('/api/admin/dashboard/:id', EmployeeCtrl.getUser)


App.post('/api/formcreate', FormCtrl.create)
App.get('/api/employee/openforms/:id', FormCtrl.getOpenFormsById)

App.post('/api/formtemplatecreate', FormTemplateCtrl.create)
App.get('/api/forms', FormTemplateCtrl.get)
App.get('/api/form/:id', FormTemplateCtrl.getOne)

App.listen(process.env.Express_PORT || port);
});