const TaskRepository = require('../repositories/taskRepository');
const TaskFactory = require('../factories/taskFactory');

class TaskService {
  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async getTasks(userId) {
    return await this.taskRepository.findByUser(userId);
  }

  async createTask(body, userId) {
    const taskData = TaskFactory.createTaskData(body, userId);
    return await this.taskRepository.create(taskData);
  }

  async updateTask(taskId, userId, body) {
    const task = await this.taskRepository.findOneByUser(taskId, userId);

    if (!task) {
      return null;
    }

    task.title = body.title;
    task.description = body.description;
    task.deadline = body.deadline;
    task.status = body.status || task.status;
    task.treeType = body.treeType || task.treeType;

    return await task.save();
  }

  async deleteTask(taskId, userId) {
    return await this.taskRepository.deleteByUser(taskId, userId);
  }
}

module.exports = TaskService;