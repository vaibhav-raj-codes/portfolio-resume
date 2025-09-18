const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fullname: { type: String, required: true },
    bio: { type: String },
    imageUrl: { type: String }, // profile image URL or uploaded path
    skills: [{ type: String }],
    education: [
        {
        degree: String,
        institution: String,
        year: Number,
        },
    ],
    experience: [
        {
        role: String,
        company: String,
        duration: String,
        description: String,
        },
    ],
    projects: [
        {
        title: String,
        description: String,
        link: String,
        },
    ],
    socialLinks: {
        linkedin: String,
        github: String,
    },
    lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);
