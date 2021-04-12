const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./../models/User');
const md5 = require('md5');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, done)=>{
    //Match user
    const user = await User.findOne({name: username});
    if(!user){
        return done(null, false, {message: 'Not user found'});
    }else{
        //Match password
        if(user.password == md5(password)){
            return done(null, user);
        }else{
            return done(null, false, {message: 'Incorrect Password'});
        }
    }
}));

passport.serializeUser((user, done)=>{
    done(null, user.id);
})

passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
        done(err, user);
    });
});