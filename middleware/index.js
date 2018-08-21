var User = require("../user");
var middleware = {};

middleware.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
};

middleware.isAdmin = function(req, res, next) {
    if(req.isAuthenticated()) {
        User.findById(req.user._id, function(err, user) {
            if(err) {
                console.log(err);
                res.redirect("/game");
            }
            else {
                if(user.admin) {
                    return next();
                }
                else {
                    res.redirect("/game");
                }
            }
        });
    }
    else {
        res.redirect("/");
    }
};

module.exports = middleware;