const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const crypto = require("crypto");
const User = require("../models/User");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log(process.env.SENDGRID_API_KEY);
// @desc register user
// @route GET /api/v1/auth/register
// access Public

exports.register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;

  // Create User
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    role,
  });
  if (!user) {
    return next(
      new ErrorResponse("Please provide and email and password", 400)
    );
  }
  const msg = {
    to: email,
    from: "info@techluminateacademy.com",
    templateId: "d-b4de86028308455ebaaad2f7fd1d3b90",
    dynamicTemplateData: {
      subject: "Testing Templates",
      name: firstName,
    },
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch(error => {
      console.error(error);
    });

  // Send token response
  sendTokenResponse(user, 200, res);
});

// @desc login user
// @route GET /api/v1/auth/login
// access Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //  Validate email & password
  if (!email || !password) {
    return next(
      new ErrorResponse("Please provide and email and password", 400)
    );
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Send token response
  sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: false,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  console.log(token);
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};

// @desc      Get current logged in user
// @route     GET /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  // user is already available in req due to the protect middleware
  const user = req.user;

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 + 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc      Forgot password
// @route     POST /api/v1/auth/forgotpassword
// @access    Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  const { email } = req.body;
  if (!user) {
    return next(new ErrorResponse("There is no user with that email", 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    data: user,
  });

  console.log(resetToken);
  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetpassword/${resetToken}`;

  const message =
    "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
    "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
    `https://techluminateacademy.herokuapp.com/reset/${resetToken}\n\n` +
    "If you did not request this, please ignore this email and your password will remain unchanged.\n";
  // const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  const msg = {
    to: email, // Change to your recipient
    from: "info@techluminateacademy.com", // Change to your verified sender
    subject: "Forgot password ",
    text: `${message}`,
    html: `<p>${message}</p>`,
  };
  try {
    sgMail.send(msg);
  } catch (error) {
    console.error(error);
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse("Email could not be sent", 500));
  }

  // .catch(error => {
  //   console.error(error);
  //   console.log(err);
  //   user.resetPasswordToken = undefined;
  //   user.resetPasswordExpire = undefined;

  //   await user.save({ validateBeforeSave: false });

  //   return next(new ErrorResponse("Email could not be sent", 500));
  // });

  // try {
  //   const messageOne = await sgMail.send(msg);
  //   console.log(messageOne);
  //   // res.status(200).json({ success: true, data: "Email sent" });
  // } catch (err) {
  //   console.log(err.message, "hello");
  //   user.resetPasswordToken = undefined;
  //   user.resetPasswordExpire = undefined;
  //   await user.save({ validateBeforeSave: false });

  //   return next(new ErrorResponse("Email could not be sent", 500));
  // }
  // // Create reset url
  // const resetUrl = `${req.protocol}://${req.get(
  //   'host',
  // )}/api/v1/auth/resetpassword/${resetToken}`;

  // const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  // try {
  //   await sendEmail({
  //     email: user.email,
  //     subject: 'Password reset token',
  //     message,
  //   });

  //   res.status(200).json({ success: true, data: 'Email sent' });
  // } catch (err) {
  //   console.log(err);
  //   user.resetPasswordToken = undefined;
  //   user.resetPasswordExpire = undefined;

  //   await user.save({ validateBeforeSave: false });

  //   return next(new ErrorResponse('Email could not be sent', 500));
  // }
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  // Check to see if user exist
  if (!user) {
    return next(new ErrorResponse("Invalid token", 400));
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendTokenResponse(user, 200, res);
});
