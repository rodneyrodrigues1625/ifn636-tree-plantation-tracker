const LocationService = require('../services/locationService');

const locationService = new LocationService();

const getLocations = async (req, res) => {
  try {
    const locations = await locationService.getLocations(req.user.id);
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch locations' });
  }
};

const createLocation = async (req, res) => {
  try {
    const location = await locationService.createLocation(req.body, req.user.id);
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create location' });
  }
};

const updateLocation = async (req, res) => {
  try {
    const updatedLocation = await locationService.updateLocation(
      req.params.id,
      req.user.id,
      req.body
    );

    if (!updatedLocation) {
      return res.status(404).json({ message: 'Location not found' });
    }

    res.json(updatedLocation);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update location' });
  }
};

const deleteLocation = async (req, res) => {
  try {
    const deletedLocation = await locationService.deleteLocation(req.params.id, req.user.id);

    if (!deletedLocation) {
      return res.status(404).json({ message: 'Location not found' });
    }

    res.json({ message: 'Location deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete location' });
  }
};

module.exports = {
  getLocations,
  createLocation,
  updateLocation,
  deleteLocation,
};