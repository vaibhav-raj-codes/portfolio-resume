const express = require('express');
const router = express.Router();
const Portfolio = require('../models/portfolio');
const { validatePortfolio } = require('../middleware');
router.get('/', (req, res) => {
  res.send('Portfolio Home');
});
// GET form (modify existing or create new)
router.get('/new/:userId', async (req, res) => {
  const { userId } = req.params;
  const portfolio = await Portfolio.findOne({ user: userId }) || {};
  res.render('portfolio/form', { portfolio, userId });
});

// POST (create or update)
router.post('/view/:userId', validatePortfolio, async (req, res) => {
  const { userId } = req.params;
  const { fullName, bio, imageUrl, skills, education, experience, projects, socialLinks } = req.body;

  let portfolio = await Portfolio.findOne({ user: userId });

  const data = {
    user: userId,
    fullName,
    bio,
    imageUrl,
    skills: skills.split(',').map(s => s.trim()), // convert comma string → array
    education,
    experience,
    projects,
    socialLinks
  };

  if (portfolio) {
    await Portfolio.updateOne({ user: userId }, data);
    req.flash('success', 'Portfolio updated!');
  } else {
    portfolio = new Portfolio(data);
    await portfolio.save();
    req.flash('success', 'Portfolio created!');
  }

  res.redirect(`/portfolio/view/${userId}`);
});

// GET view portfolio
router.get('/view/:userId', async (req, res) => {
  const { userId } = req.params;
  const portfolio = await Portfolio.findOne({ user: userId });
  if (!portfolio) {
    req.flash('error', 'Portfolio not found!');
    return res.redirect(`/portfolio/new/${userId}`);
  }
  res.render('portfolio/view', { portfolio });
});

module.exports = router;
