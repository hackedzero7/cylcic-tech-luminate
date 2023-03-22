const ErrorResponse = require("../utils/errorResponse");
const Course = require("../models/course");
const asyncHandler = require("../middleware/async");
// @desc get all courses
// @route GET /api/v1/courses
// access Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  const courses = await Course.find();
  res.status(200).json({ success: true, count: courses.length, data: courses });
});

// @desc get single course
// @route GET /api/v1/:id
// access Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return next(
      new ErrorResponse(`Course not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: course });
});

// @desc create single course
// @route post /api/v1/course
// access Public
exports.createCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.create(req.body);

  res.status(201).json({ success: true, data: course });
});

// exports.updateCourse = asyncHandler(async (req, res, next) => {
//   const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });
//   if (!course) {
//     new ErrorResponse(`Course not found with id of ${req.params.id}`, 404);
//   }
//   res.status(200).json({
//     success: true,
//     msg: `Update course ${req.params.id}`,
//     data: req.body,
//   });
// });

// @desc update single course
// @route GET /api/v1/:id
// access Public
exports.updateCourse = asyncHandler(async (req, res, next) => {
  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});

exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findByIdAndRemove(req.params.id);

  if (!course) {
    new ErrorResponse(`Course not found with id of ${req.params.id}`, 404);
  }
  res.status(200).json({
    success: true,
    msg: "Course successfully deleted",
    data: {},
  });
});
