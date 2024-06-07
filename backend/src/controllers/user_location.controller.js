const userLocationService = require('../services/user_location.service');

exports.getAllUserLocations = async (req, res) => {
  try {
    const userLocations = await userLocationService.getAllUserLocations();
    res.status(200).json(userLocations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserLocationById = async (req, res) => {
  try {
    const userLocation = await userLocationService.getUserLocationById(req.params.id);
    if (userLocation) {
      res.status(200).json(userLocation);
    } else {
      res.status(404).json({ message: 'User location not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createUserLocation = async (req, res) => {
  try {
    const newUserLocation = await userLocationService.createUserLocation(req.body);
    res.status(201).json(newUserLocation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUserLocation = async (req, res) => {
  try {
    const updatedUserLocation = await userLocationService.updateUserLocation(req.params.id, req.body);
    if (updatedUserLocation) {
      res.status(200).json(updatedUserLocation);
    } else {
      res.status(404).json({ message: 'User location not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUserLocation = async (req, res) => {
  try {
    const deletedUserLocation = await userLocationService.deleteUserLocation(req.params.id);
    if (deletedUserLocation) {
      res.status(200).json(deletedUserLocation);
    } else {
      res.status(404).json({ message: 'User location not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
