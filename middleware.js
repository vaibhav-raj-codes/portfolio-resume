
const ExpressError = require('./utils/ExpressError.js');

const isLoggedIn =(req,res,next)=>{
    // console.log(req.user);
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be logged in first!");
        return res.redirect('/login');
    } 
    next();
};

module.exports.isLoggedIn = isLoggedIn;

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};



