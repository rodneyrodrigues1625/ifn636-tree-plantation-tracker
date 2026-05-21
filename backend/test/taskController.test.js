const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');

const TaskService = require('../services/taskService');
const LocationService = require('../services/locationService');
const DashboardService = require('../services/dashboardService');

const taskController = require('../controllers/taskController');
const locationController = require('../controllers/locationController');
const dashboardController = require('../controllers/dashboardController');

const { expect } = chai;

describe('LeafLine Functional Tests', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('FT-01 should create a tree record successfully', async () => {
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      body: {
        title: 'Native Gum Tree',
        description: 'Community garden plantation site',
        deadline: '2026-06-15',
        treeType: 'Native',
        status: 'Planted',
      },
    };

    const createdTask = {
      _id: new mongoose.Types.ObjectId(),
      ...req.body,
      user: req.user.id,
    };

    sinon.stub(TaskService.prototype, 'createTask').resolves(createdTask);

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    await taskController.createTask(req, res);

    expect(res.status.calledWith(201)).to.equal(true);
    expect(res.json.calledWith(createdTask)).to.equal(true);
  });

  it('FT-02 should fetch tree records successfully', async () => {
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
    };

    const tasks = [
      {
        _id: new mongoose.Types.ObjectId(),
        title: 'Tree Record 1',
        description: 'Plantation site',
        deadline: '2026-06-15',
        treeType: 'Native',
        status: 'Healthy',
        user: req.user.id,
      },
    ];

    sinon.stub(TaskService.prototype, 'getTasks').resolves(tasks);

    const res = {
      json: sinon.spy(),
    };

    await taskController.getTasks(req, res);

    expect(res.json.calledWith(tasks)).to.equal(true);
  });

  it('FT-03 should update a tree record successfully', async () => {
    const req = {
      params: { id: new mongoose.Types.ObjectId().toString() },
      user: { id: new mongoose.Types.ObjectId() },
      body: {
        title: 'Updated Tree Record',
        description: 'Updated plantation notes',
        deadline: '2026-06-20',
        treeType: 'Native',
        status: 'Healthy',
      },
    };

    const updatedTask = {
      _id: req.params.id,
      ...req.body,
      user: req.user.id,
    };

    sinon.stub(TaskService.prototype, 'updateTask').resolves(updatedTask);

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    await taskController.updateTask(req, res);

    expect(res.json.calledWith(updatedTask)).to.equal(true);
  });

  it('FT-04 should return 404 when tree record is not found', async () => {
    const req = {
      params: { id: new mongoose.Types.ObjectId().toString() },
      user: { id: new mongoose.Types.ObjectId() },
      body: {
        title: 'Missing Tree',
        description: 'Invalid update',
        deadline: '2026-06-20',
        treeType: 'Native',
        status: 'Healthy',
      },
    };

    sinon.stub(TaskService.prototype, 'updateTask').resolves(null);

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    await taskController.updateTask(req, res);

    expect(res.status.calledWith(404)).to.equal(true);
    expect(res.json.calledWith({ message: 'Task not found' })).to.equal(true);
  });

  it('FT-05 should delete a tree record successfully', async () => {
    const req = {
      params: { id: new mongoose.Types.ObjectId().toString() },
      user: { id: new mongoose.Types.ObjectId() },
    };

    const deletedTask = {
      _id: req.params.id,
      title: 'Deleted Tree Record',
    };

    sinon.stub(TaskService.prototype, 'deleteTask').resolves(deletedTask);

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    await taskController.deleteTask(req, res);

    expect(res.json.calledWith({ message: 'Task deleted successfully' })).to.equal(true);
  });

  it('FT-06 should create a plantation location successfully', async () => {
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      body: {
        locationName: 'Brisbane Botanic Garden',
        suburb: 'Brisbane City',
        latitude: -27.4756,
        longitude: 153.0305,
        notes: 'Test plantation site',
      },
    };

    const createdLocation = {
      _id: new mongoose.Types.ObjectId(),
      ...req.body,
      user: req.user.id,
    };

    sinon.stub(LocationService.prototype, 'createLocation').resolves(createdLocation);

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    await locationController.createLocation(req, res);

    expect(res.status.calledWith(201)).to.equal(true);
    expect(res.json.calledWith(createdLocation)).to.equal(true);
  });

  it('FT-07 should fetch plantation locations successfully', async () => {
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
    };

    const locations = [
      {
        _id: new mongoose.Types.ObjectId(),
        locationName: 'Brisbane Botanic Garden',
        suburb: 'Brisbane City',
        latitude: -27.4756,
        longitude: 153.0305,
        notes: 'Test plantation site',
        user: req.user.id,
      },
    ];

    sinon.stub(LocationService.prototype, 'getLocations').resolves(locations);

    const res = {
      json: sinon.spy(),
    };

    await locationController.getLocations(req, res);

    expect(res.json.calledWith(locations)).to.equal(true);
  });

  it('FT-08 should fetch dashboard summary successfully', async () => {
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
    };

    const summary = {
      totalTasks: 3,
      planned: 1,
      planted: 1,
      healthy: 1,
      needsWater: 0,
      atRisk: 0,
      completed: 0,
      totalLocations: 2,
    };

    sinon.stub(DashboardService.prototype, 'getSummary').resolves(summary);

    const res = {
      json: sinon.spy(),
    };

    await dashboardController.getDashboardSummary(req, res);

    expect(res.json.calledWith(summary)).to.equal(true);
  });

  it('FT-09 should handle dashboard summary failure', async () => {
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
    };

    sinon.stub(DashboardService.prototype, 'getSummary').throws(new Error('Dashboard error'));

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    await dashboardController.getDashboardSummary(req, res);

    expect(res.status.calledWith(500)).to.equal(true);
    expect(res.json.calledWith({ message: 'Failed to fetch dashboard summary' })).to.equal(true);
  });
});