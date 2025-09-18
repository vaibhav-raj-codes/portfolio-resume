const User = require('../models/user.js');


module.exports.renderSignUpForm = (req,res)=>{
    res.render('users/signup.ejs');
};

module.exports.signUp = async (req,res)=>{
    try{
        let {username,password}=req.body;
    const newUser = new User({username});
    const registeredUser = await User.register(newUser,password);
    // console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err) return next(err);
        req.flash(`success','Welcome you ${username}`);
        res.send('Signed Up Successfully!');
    });
    
    }
    catch(e){
        req.flash('error',e.message);
        res.redirect('/signup');
    }
};
module.exports.renderLoginForm = (req,res)=>{
    res.render('users/login.ejs');
};
module.exports.login = async (req,res,next)=>{
    req.flash('success','Your logged in, Welcome to Wanderlust!');
    res.send("login success !");
};
module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash('success','You logged out successfully!');
        res.redirect('/login');
    });
};

