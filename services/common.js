const passport = require("passport");

exports.isAuth = () => {
  return passport.authenticate("jwt");
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MjhmOTkyMzIxODFjOTBlNzQ3Yzk1OCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk3MTkyNDAwfQ.NfBxkq6JXF-2tvTKX0jvuoVGsSOdDHfoDTv6A6mEcME";
  return token;
};
