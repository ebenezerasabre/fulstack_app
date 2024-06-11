const bcrypt = require('bcrypt');
const authModel = require('../models/auth.model');

const registerUser = async (userData) => {
  const { user_id, password } = userData;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const authData = {
    user_id,
    password_hash: hashedPassword,
    last_login: null
  };

  return await authModel.createAuth(authData);
};

const verifyUser = async (user_id, plainPassword) => {
  const authRecord = await authModel.getAuthByUserId(user_id);
  
  if (!authRecord) {
    throw new Error('User not found');
  }

  const isMatch = await bcrypt.compare(plainPassword, authRecord.password_hash);

  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  return authRecord;
};

module.exports = {
  registerUser,
  verifyUser
};
