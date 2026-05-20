const Location = require('../models/Location');
const BaseRepository = require('./baseRepository');

class LocationRepository extends BaseRepository {
  constructor() {
    super(Location);
  }
}

module.exports = LocationRepository;