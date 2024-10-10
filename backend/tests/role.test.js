const request = require('supertest');
const express = require('express');
const router = require('../routes/role.routes'); // Adjust this path to your file structure
const Role = require('../models/role.model'); // Mock this model

const app = express();
app.use(express.json());
app.use('/roles', router);

// Mock the Role model
jest.mock('../models/role.model');

describe('Role Routes', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Test GET /roles/all
    describe('GET /roles/all', () => {
        it('should return a list of roles', async () => {
            const mockRoles = [
                {
                    role_id: 301,
                    role_name: 'Procurement Manager',
                    permissions: [
                        'read:Raw Materials Procurement:all',
                        'write:Raw Materials Procurement:self'
                    ]
                },
                {
                    role_id: 302,
                    role_name: 'Sales Manager',
                    permissions: [
                        'read:Sales:all',
                        'write:Sales:self'
                    ]
                }
            ];
            Role.find.mockResolvedValue(mockRoles);

            const response = await request(app).get('/roles/all');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockRoles);
            expect(Role.find).toHaveBeenCalledTimes(1);
        });

        it('should return a 500 status code if there is a server error', async () => {
            Role.find.mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/roles/all');
            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('error', 'Database error');
            expect(Role.find).toHaveBeenCalledTimes(1);
        });
    });

    // Test GET /roles/:id
    describe('GET /roles/:id', () => {
        it('should return a single role when it exists', async () => {
            const mockRole = {
                role_id: 301,
                role_name: 'Procurement Manager',
                permissions: [
                    'read:Raw Materials Procurement:all',
                    'write:Raw Materials Procurement:self'
                ]
            };
            Role.find.mockResolvedValue([mockRole]);

            const response = await request(app).get('/roles/301');
            expect(response.status).toBe(200);
            expect(response.body).toEqual([mockRole]);
            expect(Role.find).toHaveBeenCalledWith({ role_id: '301' });
        });

        it('should return a 500 status code if there is a server error', async () => {
            Role.find.mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/roles/301');
            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('error', 'Database error');
            expect(Role.find).toHaveBeenCalledTimes(1);
        });
    });

    // Test POST /roles/create
    describe('POST /roles/create', () => {
        it('should create a new role and return it', async () => {
            const newRole = {
                role_id: 303,
                role_name: 'Logistics Manager',
                permissions: [
                    'read:Logistics:all',
                    'write:Logistics:self'
                ]
            };
            Role.create.mockResolvedValue(newRole);

            const response = await request(app)
                .post('/roles/create')
                .send(newRole);

            expect(response.status).toBe(201);
            expect(response.body).toEqual(newRole);
            expect(Role.create).toHaveBeenCalledWith(newRole);
        });

        it('should return a 500 status code if there is a server error', async () => {
            Role.create.mockRejectedValue(new Error('Database error'));

            const response = await request(app)
                .post('/roles/create')
                .send({
                    role_id: 304,
                    role_name: 'Quality Assurance Manager',
                    permissions: [
                        'read:Quality Assurance:all',
                        'write:Quality Assurance:self'
                    ]
                });

            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('error', 'Database error');
            expect(Role.create).toHaveBeenCalledTimes(1);
        });
    });
});
