const Task = require('../models/Task');
const BaseRepository = require('./baseRepository');

class TaskRepository extends BaseRepository {
  constructor() {
    super(Task);
  }

  async getDashboardSummary(userId) {
    const tasks = await this.findByUser(userId);

    return {
      totalTasks: tasks.length,
      planned: tasks.filter((task) => task.status === 'Planned').length,
      planted: tasks.filter((task) => task.status === 'Planted').length,
      healthy: tasks.filter((task) => task.status === 'Healthy').length,
      needsWater: tasks.filter((task) => task.status === 'Needs Water').length,
      atRisk: tasks.filter((task) => task.status === 'At Risk').length,
      completed: tasks.filter((task) => task.status === 'Completed').length,
    };
  }
}

module.exports = TaskRepository;