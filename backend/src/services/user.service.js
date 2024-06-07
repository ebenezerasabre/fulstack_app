const userModel = require('../models/user.model');

exports.getAllUsers = async () => {
  try {
    return await userModel.getAllUsers();
  } catch (err) {
    throw new Error(err);
  }
};

exports.getUserById = async (id) => {
  try {
    return await userModel.getUserById(id);
  } catch (err) {
    throw new Error(err);
  }
};

exports.countUsers = async () => {
  try {
    return await userModel.countUsers();
  } catch (err) {
    throw new Error(err);
  }
};

exports.createUser = async (userData) => {
  try {
    return await userModel.createUser(userData);
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateUser = async (id, userData) => {
  try {
    return await userModel.updateUser(id, userData);
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateUsers = async (usersData) => {
  try {
    return await userModel.updateUsers(usersData);
  } catch(err){
    throw new Error(err);
  }
};

exports.deleteUser = async (id) => {
  try {
    return await userModel.deleteUser(id);
  } catch (err) {
    throw new Error(err);
  }
};
