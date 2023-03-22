const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// load en vars
dotenv.config({
  path: "./config/config.env",
});

// Load Models
const Course = require("./models/course");

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
});

// Read JSON files

const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);

// Import Data

const importData = async () => {
  try {
    await Course.create(courses);
    console.log("Data Imported ...".green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delet data
const deleteData = async () => {
  try {
    await Course.deleteMany();
    console.log("Data Destroyed ...".red.inverse);
    process.exit();
  } catch (error) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "d") {
  deleteData();
}
