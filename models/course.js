const mongoose = require("mongoose");
const slugify = require("slugify");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Please add a course title"],
  },
  slug: String,
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  duration: {
    type: String,
    required: [true, "Please add number of hours"],
  },
  minimumSkill: {
    type: String,
    required: [true, "Please add a minimum skill"],
    enum: ["beginner", "intermediate", "advanced"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create course slug from name
CourseSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model("Course", CourseSchema);
