const userModel = require("../model/userModel");

exports.sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken(res);
  res.status(statusCode).json({
    success: true,
    token,
  });
};
//register
exports.registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    //existing user
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return next(new errorResponse("Email is already resister ", 500));
    }
    const user = await userModel.create({ username, email, password });
    sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//login
exports.loginController = async () => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new errorResponse("please provide email or password "));
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new errorResponse("Invalid creditial", 401));
    }
    const isMatch = await userModel.matchPassword(password);
    if (!isMatch) {
      return next(new errorHandler("Invalid creditial", 401));
    }
    //res
    sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    next(erro);
  }
};
exports.logoutController = async () => {
  res.clearCookie("refreshToken");
  return (
    res.status(200),
    json({
      success: true,
      message: "Logout Successfully",
    })
  );
};
