const { Router } = require('express');
const router = Router();

const { 
    renderSignInForm,
    renderSignUpForm,
    signIn,
    signUp,
    logOut,
    updateList
} = require('./../controllers/users.controller');

router.get('/users/signup', renderSignUpForm);
router.post('/users/signup', signUp);

router.get('/users/signin/', renderSignInForm);
router.post('/users/signin/', signIn);

router.get('/users/logout', logOut);

router.post('/user/updatelist', updateList);

module.exports = router;