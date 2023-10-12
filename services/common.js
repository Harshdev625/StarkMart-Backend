const passport = require('passport');

exports.isAuth = () => {
  return passport.authenticate('jwt')
};

exports.sanitizeUser = (user)=>{
    return {id:user.id, role:user.role}
}