const request = require('supertest');
const express = require('express');
const router = require('../routes/department.routes'); // Adjust this path according to your file structure
const Department = require('../models/department.model'); // Mock this model

const app = express();
app.use(express.json());
app.use('/departments', router);

// Mock the Department model
jest.mock('../models/department.model');

describe('Department Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test GET /departments/all
  describe('GET /departments/all', () => {
    it('should return a list of departments', async () => {
      const mockDepartments = [
        { department_id: 1, department_name: 'HR', manager_id: 101 },
        { department_id: 2, department_name: 'Finance', manager_id: 102 },
      ];
      Department.find.mockResolvedValue(mockDepartments);

      const response = await request(app).get('/departments/all');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockDepartments);
      expect(Department.find).toHaveBeenCalledTimes(1);
    });

    it('should return a 500 status code if there is a server error', async () => {
      Department.find.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/departments/all');
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Database error');
      expect(Department.find).toHaveBeenCalledTimes(1);
    });
  });

  // Test GET /departments/:id
  describe('GET /departments/:id', () => {
    it('should return a single department when it exists', async () => {
      const mockDepartment = { department_id: 1, department_name: 'HR', manager_id: 101 };
      Department.find.mockResolvedValue([mockDepartment]);

      const response = await request(app).get('/departments/1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([mockDepartment]);
      expect(Department.find).toHaveBeenCalledWith({ department_id: '1' });
    });

    it('should return a 500 status code if there is a server error', async () => {
      Department.find.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/departments/1');
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Database error');
      expect(Department.find).toHaveBeenCalledTimes(1);
    });
  });

  // Test POST /departments/create
  describe('POST /departments/create', () => {
    it('should create a new department and return it', async () => {
      const newDepartment = { department_id: 3, department_name: 'IT', manager_id: 103 };
      Department.create.mockResolvedValue(newDepartment);

      const response = await request(app)
        .post('/departments/create')
        .send(newDepartment);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(newDepartment);
      expect(Department.create).toHaveBeenCalledWith(newDepartment);
    });

    it('should return a 500 status code if there is a server error', async () => {
      Department.create.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .post('/departments/create')
        .send({ department_id: 4, department_name: 'Sales', manager_id: 104 });

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Database error');
      expect(Department.create).toHaveBeenCalledTimes(1);
    });
  });

  // Test DELETE /departments/delete/:id
  describe('DELETE /departments/delete/:id', () => {
    it('should delete a department and return status', async () => {
      Department.deleteOne.mockResolvedValue({ deletedCount: 1 });

      const response = await request(app).delete('/departments/delete/1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ status: { deletedCount: 1 } });
      expect(Department.deleteOne).toHaveBeenCalledWith({ department_id: '1' });
    });

    it('should return a 500 status code if there is a server error', async () => {
      Department.deleteOne.mockRejectedValue(new Error('Database error'));

      const response = await request(app).delete('/departments/delete/1');
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Database error');
      expect(Department.deleteOne).toHaveBeenCalledTimes(1);
    });
  });
});
