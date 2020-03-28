const req = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe ('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        
        await connection.destroy();
    })

    it ('should be able to create a new ONG', async () => { 
        const response = await req(app)
        .post('/ongs')
        .send({
            name: "ALTA BOOKS",
            email: "email@email.com.br",
            whatsapp: "11000000000",
            city: "GUARULHOS",
            uf: "SP"
        });
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveProperty(8);
    
    });
});