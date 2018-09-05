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
var AccountKey = require("./accountKey");
var GlobalFlag = require("./globalFlag");

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
    AccountKey.findOne({key:req.body.key}, function(err, key) {
        if(err) {
            console.log(err);
            res.send("Error: Accessing database");
        }
        else if(key === null) {
            res.send("Error: Activation Key Invalid.");
        }
        else if(key.used) {
            res.send("Error: This activation key has been used");
        }
        else {
            AccountKey.findOneAndUpdate({key:req.body.key}, {used:true}, function(err, key) {
                if(err) {
                    console.log("Error using key");
                }
                else {
                    //console.log(key);
                    var newUser = {username:req.body.username, first:key.first, last:key.last, admin:key.admin};
                    User.register(newUser, req.body.password, function(err, user) {
                        if(err) {
                            //return res.redirect("/register");
                            res.send("User name is already used.");
                        }
                        else {
                            passport.authenticate("local")(req, res, function() {
                                res.redirect("/game");
                            });
                        }
                    });
                }
            });
               
        }
    })
    
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
            GlobalFlag.find(function(err, flags) {
                if(err) {
                    console.log("Error loading flags");
                }
                else {
                    var haveSave = true;
                    if(typeof user.player === "undefined") {
                        haveSave = false;
                    }
                    var theFlags = {weather:flags[0].weather, tide:flags[0].tide, sun:flags[0].sun};
                    res.render(__dirname + "/index.ejs", {username:req.session.passport.user, haveSave:haveSave, globalFlags:theFlags});
                }
            });
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
            AccountKey.find(function(err, keys) {
                if(err) {
                    console.log("Error getting keys");
                    res.send("Error getting keys");
                }
                else {
                    GlobalFlag.find(function(err, flags) {
                        if(err) {
                            console.log("Error getting flags");
                            res.send("Error getting flags");
                        }
                        else {
                            res.render("admin", {users:users, keys:keys, flags:flags[0]});
                        }
                    });
                }
            });
        }
    });
});

app.post("/admin", middleware.isAdmin, function(req, res) {
    var make = function() {
        var newKey = "";
        for(var i = 0; i < 8; i++) {
            newKey += String.fromCharCode(Math.random() * 26 + 65);
        }
        AccountKey.findOne({key:newKey}, function(err, key) {
            if(err) {
                console.log("Error finding key.");
                res.redirect("/admin");
            }
            else if(key === null) {
                AccountKey.create({key:newKey, first: req.body.first, last: req.body.last, used:false, admin:req.body.admin === 'on'}, function(err, key) {
                    if(err) {
                        console.log("Error making key.");
                        res.redirect("/admin");
                    }
                    else {
                        res.redirect("/admin");
                    }
                });
            }
            else {
                make();
            }
        });
    };
    make();
    
});

app.post("/admin/deleteKey/:key", middleware.isAdmin, function(req, res) {
    AccountKey.deleteOne({key:req.params.key}, function(err, key) {
        if(err) {
            console.log("Error deleting key.");
            res.redirect("/admin");
        }
        res.redirect("/admin");
    });
});

app.get("/admin/flags", middleware.isAdmin, function(req, res) {
    GlobalFlag.find( function(err, flags) {
        if(err) {
            console.log("Error getting flags");
            res.redirect("/admin");
        }
        else {
            flags[0][req.query.type] = !flags[0][req.query.type];
            GlobalFlag.findByIdAndUpdate(flags[0]._id, flags[0], function(err) {
                if(err) console.log("Error Saving flag");
                res.redirect("/admin");
            });
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

app.post("/admin/:id/delete", middleware.isAdmin, function(req,res) {
    User.deleteOne({_id:req.params.id}, function(err, user) {
        if(err) {
            console.log("Error deleting user");
            res.send("Error deleting user");
        }
        else {
            res.redirect("/admin");
        }
    });
});

app.get("/admin/:id/Unlock", middleware.isAdmin, function(req,res) {
    User.findById(req.params.id, function(err, user) {
        if(err) {
            console.log("Error Unlocking");
            res.redirect("/admin");
        }
        else {
            if(req.query.type == "Weather")
                user.player.flags[8] = true;
            if(req.query.type == "Tide")
                user.player.flags[9] = true;
            if(req.query.type == "Sun")
                user.player.flags[10] = true;
            User.findByIdAndUpdate(req.params.id, {player:user.player}, function(err, user) {
                if(err) {
                    console.log(err);
                }
                res.redirect("/admin");
            });
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