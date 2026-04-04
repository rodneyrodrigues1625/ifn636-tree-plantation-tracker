const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const Task = require('../models/Task');
const { createTask } = require('../controllers/taskController');

const { expect } = chai;

describe('Task Controller Tests', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('createTask', () => {
    it('should create a new task successfully', async () => {
      const req = {
        user: { id: new mongoose.Types.ObjectId() },
        body: {
          title: 'Tree Record 1',
          description: 'Brisbane plantation site',
          deadline: '2026-12-31',
        },
      };

      const createdTask = {
        _id: new mongoose.Types.ObjectId(),
        ...req.body,
        user: req.user.id,
      };

      const createStub = sinon.stub(Task, 'create').resolves(createdTask);

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await createTask(req, res);

      expect(createStub.calledOnceWith({
        title: req.body.title,
        description: req.body.description,
        deadline: req.body.deadline,
        user: req.user.id,
      })).to.be.true;

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(createdTask)).to.be.true;
    });

    it('should return 500 if task creation fails', async () => {
      sinon.stub(Task, 'create').throws(new Error('DB Error'));

      const req = {
        user: { id: new mongoose.Types.ObjectId() },
        body: {
          title: 'Tree Record 2',
          description: 'Gold Coast plantation site',
          deadline: '2026-11-30',
        },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await createTask(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ message: 'Failed to create task' })).to.be.true;
    });
  });
});