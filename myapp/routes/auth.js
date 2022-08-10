var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
const usersController = require ('../controllers/usersController');

const auth = express.Router();

passport.use(new LocalStrategy(async function verify(username, password, cb) {
    console.log('----> Usando estratégia local do passport');
    var user = await usersController.validateUser(username, password)
    console.log(username);
    console.log(password);
    if (user.id){
        return cb(null, user);
    }else
        return cb(null, false, { message: 'Nome de usuário ou senha incorreto' });
}));

auth.post('/login/password', passport.authenticate('local', {
    successRedirect: '/index.html',
    failureRedirect: '/loginpassport'
}));

auth.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
});

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        cb(null, { id: user.id, username: user.username });
    });
});
  
passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});


module.exports = auth;