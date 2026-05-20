const TaskRepository = require('../repositories/taskRepository');
const LocationRepository = require('../repositories/locationRepository');

class DashboardService {
  constructor() {
    this.taskRepository = new TaskRepository();
    this.locationRepository = new LocationRepository();
  }

  async getSummary(userId) {
    const taskSummary = await this.taskRepository.getDashboardSummary(userId);
    const locations = await this.locationRepository.findByUser(userId);

    return {
      ...taskSummary,
      totalLocations: locations.length,
    };
  }
}

module.exports = DashboardService;