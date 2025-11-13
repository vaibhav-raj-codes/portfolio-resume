const express = require("express");
const passport = require("passport");
const User = require("../models/User");
const router = express.Router();

// Middleware to check if logged in
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  req.flash("error", "You must be logged in first!");
  res.redirect("/users/login");
};

// ================= Signup =================

// Signup form
router.get("/signup", (req, res) => {
  res.render("users/signup");
});

// Signup POST
router.post("/signup", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username});
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome! Your account is created.");
      res.redirect(`/users/${registeredUser._id}`);
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/users/signup");
  }
});

// ================= Login =================

// Login form
router.get("/login", (req, res) => {
  res.render("users/login");
});

// Login POST
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash(
      "success",
      `Welcome back, ${ req.user.username}`
    );
    res.redirect(`/users/${req.user._id}`);
  }
);

// ================= Logout =================
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "You have logged out successfully!");
    res.redirect("/users/login");
  });
});

// ================= User Profile =================
router.get("/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    req.flash("error", "User not found!");
    return res.redirect("/");
  }
  res.render("users/profile", { user });
});

module.exports = router;
