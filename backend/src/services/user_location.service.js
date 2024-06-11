const userLocationModel = require('../models/user_location.model');

exports.getAllUserLocations = async () => {
  try {
    return await userLocationModel.getAllUserLocations();
  } catch (err) {
    throw new Error(err);
  }
};

exports.getUserLocationById = async (id) => {
  try {
    return await userLocationModel.getUserLocationById(id);
  } catch (err) {
    throw new Error(err);
  }
};

exports.createUserLocation = async (userLocationData) => {
  try {
    return await userLocationModel.createUserLocation(userLocationData);
  } catch (err) {
    throw new Error(err);
  }
};

exports.createMultipleUserLocations = async (userLocationsData) => {
  try {
    return await userLocationModel.createMultipleUserLocations(userLocationsData);
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateUserLocation = async (id, userLocationData) => {
  try {
    return await userLocationModel.updateUserLocation(id, userLocationData);
  } catch (err) {
    throw new Error(err);
  }
};

exports.deleteUserLocation = async (id) => {
  try {
    return await userLocationModel.deleteUserLocation(id);
  } catch (err) {
    throw new Error(err);
  }
};
