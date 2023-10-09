const User = require("../models/User");

exports.CreateUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const response = await user.save();
    console.log(response);
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

exports.loginUser = async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).exec();
  console.log(user);
  try {
    if (!user) {
      res.status(401).json({ message: "Wrong Email" });
    } else if (user.password === req.body.password) {
      res
        .status(200)
        .json({
          id: user.id,
          email: user.email,
          name: user.name,
          addresses: user.addresses,
        });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};
