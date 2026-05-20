class TaskFactory {
  static createTaskData(body, userId) {
    return {
      title: body.title,
      description: body.description,
      deadline: body.deadline,
      status: body.status || 'Planned',
      treeType: body.treeType || 'General',
      user: userId,
    };
  }
}

module.exports = TaskFactory;