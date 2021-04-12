const usersCtrl = {};
const md5 = require('md5');
const User = require('./../models/User');

usersCtrl.renderSignUpForm = (req, res)=>{
    res.render('users/signup');
}
usersCtrl.signUp = async (req, res)=>{
    const errors = [];
    const {username, password, password2} = req.body;
    if(password != password2){
        errors.push({
            text: "Passwords don't match."
        });
    }
    if( password.length < 1 ){
        errors.push({
            text: "Password must be at least 1 character."
        });
    }
    if( username.length < 1 ){
        errors.push({
            text: "Username must be at least 1 character."
        });
    }
    if(errors.length>0){
        res.render('users/signup',{
            errors,
            username
        });
    }else{
        const usernameUser = await User.findOne({name: username});
        if(usernameUser){
            req.flash('error_msg', 'The username is already in use.');
            res.redirect('/users/signup');
        }else{
            const newUser = new User({
                name: username,
                password: md5(password)
            });
            await newUser.save();
            req.flash('success_msg', 'User addeded.');
            res.redirect('/users/signin');
        }
        //res.send('signUp Successfuly');
    }
    
}

usersCtrl.renderSignInForm = (req, res)=>{
    res.render('users/signin');
}
usersCtrl.signIn = (req, res)=>{
    res.send('signIn');
}

usersCtrl.logOut = (req, res)=>{
    res.send('Logout');
}

module.exports = usersCtrl;