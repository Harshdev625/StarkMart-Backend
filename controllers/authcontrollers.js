const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { sanitizeUser } = require("../services/common");
const User = require("../models/User");

exports.CreateUser = async (req, res) => {
  console.log("createuser");
  try {
    const salt = crypto.randomBytes(16);
    console.log("Generated salt:", salt);

    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async (err, derivedKey) => {
        if (err) {
          console.error("Error during password hashing:", err);
          return res.status(400).json({ error: "Error during password hashing" });
        }

        const user = new User({ ...req.body, password: derivedKey, salt });
        console.log("User data:", user);

        const doc = await user.save();
        console.log("Saved user:", doc);

        req.login(sanitizeUser(doc), (err) => {
          if (err) {
            console.error("Error during login:", err);
            return res.status(400).json({ error: "Error during login" });
          } else {
            const token = jwt.sign(sanitizeUser(doc), process.env.JWT_SECERT_KEY);
            console.log("Generated token:", token);
            res
              .cookie("jwt", token, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true,
              })
              .status(201)
              .json({ id: doc.id, role: doc.role });
          }
        });
      }
    );
  } catch (err) {
    console.error("General error:", err);
    res.status(400).json({ error: "General error" });
  }
};


exports.loginUser = async (req, res) => {
  const user = req.user
  res
    .cookie("jwt", user.token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    })
    .status(201)
    .json({id:user.id, role:user.role});
};

exports.checkAuth = async (req, res) => {
  if(req.user){
    res.json(req.user);
  } else{
    res.sendStatus(401);
  }
};
