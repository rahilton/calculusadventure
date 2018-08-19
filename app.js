var express = require("express");
var app = express();
var path = require("path");
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var bodyParser = require("body-parser");

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
    var newUser = {username:req.body.username};
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
        failureRedirect: "/register"
    }) , function(req, res) {
        console.log("Does this run?");
    
});

app.get("/game", function(req, res) {
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