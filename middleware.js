const { portfolioSchema } = require('./schemas');

module.exports.validatePortfolio = (req, res, next) => {
  const { error } = portfolioSchema.validate({ portfolio: req.body });
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    req.flash('error', msg);
    return res.redirect('back');
  }
  next();
};
