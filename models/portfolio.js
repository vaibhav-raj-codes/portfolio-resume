const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' }, // linked to user
  fullName: { type: String, required: true }, // NEW field
  bio: { type: String, required: true },
  imageUrl: { type: String, required: true },
  skills: [{ type: String, required: true }],
  education: [
    {
      degree: { type: String, required: true },
      institution: { type: String, required: true },
      year: { type: Number, required: true }
    }
  ],
  experience: [
    {
      role: String,
      company: String,
      duration: String,
      description: String
    }
  ],
  projects: [
    {
      title: String,
      description: String,
      link: String
    }
  ],
  socialLinks: {
    linkedin: { type: String, required: true },
    github: { type: String, required: true }
  }
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
