const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const resetAndLogin = async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash('password',10);
  const user = new User({
    username: 'testusername',
    passwordHash: passwordHash
  });
  const savedUser = await user.save();
  const userForToken = {
    username: savedUser.username,
    id: savedUser._id
  };
  savedUser.id = savedUser._id.toString();
  const token = await jwt.sign(userForToken,process.env.SECRET);
  const authorizationHeader = `bearer ${token}`;
  
  return({
    authorizationHeader,
    savedUser
  });

};

module.exports = resetAndLogin;