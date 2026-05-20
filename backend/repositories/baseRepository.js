class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async findByUser(userId) {
    return await this.model.find({ user: userId }).sort({ createdAt: -1 });
  }

  async findOneByUser(id, userId) {
    return await this.model.findOne({ _id: id, user: userId });
  }

  async deleteByUser(id, userId) {
    const item = await this.findOneByUser(id, userId);

    if (!item) {
      return null;
    }

    await item.deleteOne();
    return item;
  }
}

module.exports = BaseRepository;