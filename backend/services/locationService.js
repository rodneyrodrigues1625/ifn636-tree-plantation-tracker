const LocationRepository = require('../repositories/locationRepository');

class LocationService {
  constructor() {
    this.locationRepository = new LocationRepository();
  }

  async getLocations(userId) {
    return await this.locationRepository.findByUser(userId);
  }

  async createLocation(body, userId) {
    const locationData = {
      locationName: body.locationName,
      suburb: body.suburb,
      latitude: body.latitude,
      longitude: body.longitude,
      notes: body.notes || '',
      task: body.task || null,
      user: userId,
    };

    return await this.locationRepository.create(locationData);
  }

  async updateLocation(locationId, userId, body) {
    const location = await this.locationRepository.findOneByUser(locationId, userId);

    if (!location) {
      return null;
    }

    location.locationName = body.locationName;
    location.suburb = body.suburb;
    location.latitude = body.latitude;
    location.longitude = body.longitude;
    location.notes = body.notes || location.notes;
    location.task = body.task || location.task;

    return await location.save();
  }

  async deleteLocation(locationId, userId) {
    return await this.locationRepository.deleteByUser(locationId, userId);
  }
}

module.exports = LocationService;