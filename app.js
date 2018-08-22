var express = require("express");
var app = express();
var path = require("path");
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var bodyParser = require("body-parser");
var middleware = require("./middleware");

var User = require("./user");

app.use(express.static(__dirname + '/js'));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

//mongoose.connect("mongodb://localhost/calcgame");
mongoose.connect("mongodb://rahilton:RITLAR1@ds127362.mlab.com:27362/calculusadventure");

//Passport configuration
app.use(require("express-session")({
    secret: "This is my secret.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/login.html");
});

app.get("/register", function(req, res) {
    res.sendFile(__dirname + "/register.html");
});

app.post("/register", function(req,res) {
    var newUser = {username:req.body.username, admin:false};
    //console.log(newUser);
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            return res.redirect("/register");
        }
        else {
            passport.authenticate("local")(req, res, function() {
                res.redirect("/game");
            });
        }
    });
});

app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/game",
        failureRedirect: "/"
    }) , function(req, res) {
        console.log("Does this run?");
    
});

app.get("/game", middleware.isLoggedIn, function(req, res) {
    //console.log(req.session);
    User.findOne({username:req.session.passport.user}, function(err, user) {
        if(err) {
            console.log("Error loading player");
        }
        else {
            var haveSave = true;
            if(typeof user.player === "undefined") {
                haveSave = false;
            }
            res.render(__dirname + "/index.ejs", {username:req.session.passport.user, haveSave:haveSave});
        }
    });
    
});

app.get("/admin", middleware.isAdmin, function(req, res) {
    User.find(function(err, users) {
        if(err) {
            console.log("Error getting users");
            res.send("Error getting users");
        }
        else {
            res.render("admin", {users:users});
        }
    });
});

app.get("/admin/:id", middleware.isAdmin, function(req,res) {
    User.findById(req.params.id, function(err, user) {
        if(err) {
            console.log("Error getting user");
            res.send("Error getting user");
        }
        else {
            res.render("player", {user:user});
        }
    });
    
    
});

app.get("/admin/:id/password", middleware.isAdmin, function(req,res) {
    User.findById(req.params.id, function(err, user) {
        if(err) {
            console.log("Error getting user");
            res.send("Error getting user");
        }
        else {
            res.render("password", {user:user});
        }
    });
});

app.post("/admin/:id/password", middleware.isAdmin, function(req,res) {
    if(req.body.password1 === req.body.password2) {
        User.findById(req.params.id, function(err, user) {
            if(err) {
                console.log("Error getting user");
                res.send("Error getting user");
            }
            else {
                user.setPassword(req.body.password1, function(err, newUser) {
                    if(err) {
                        console.log("Error saving new password");
                        res.send("Error saving new password");
                    }
                    else {
                        user.save();
                        res.redirect("/admin");
                    }
                });
            }
        });
    }
    else {
        res.redirect("/admin/" + req.params.id + "/password");
    }
});

// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("The Game server has started!");
// });


server.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Game server has started!");
});




io.on('connection', function (socket) {
  socket.on('save player', function (data) {
    User.findOneAndUpdate({username:data.user}, {player:data.player}, function(err, user) {
        if(err) {
            console.log("Error saving player");
        }
    });
  });
  socket.on('load player', function (data) {
    User.findOne({username:data.user}, function(err, user) {
        if(err) {
            console.log("Error loading player");
        }
        else {
            socket.emit('found player', {player:user.player})
        }
    });
  });
  
});