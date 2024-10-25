// Load necessary modules dynamically
const db = require("../config/database.js").bootstrapDatabase;
const { describe } = require("mocha");
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js'); 

chai.use(chaiHttp);
const { expect } = chai;

describe('User API Tests', () => {
    let userId;
  
    
    before((done) => {
      
      done();
    });
  
    it('should create a new user successfully', (done) => {
      chai.request(app)
        .post('/api/user')
        .send({
          email: 's456t1@example3.com',
          password: 'Password@123',
          firstName: 'Test',
          lastName: 'User'
        })
        .end((err, res) => {
          if (err) done(err); 
          expect(res).to.have.status(201);
          userId = res.body.id; 
          done(); // test will end here
        });
    });

    it('should not create a user with an invalid email', (done) => {
        chai.request(app)
            .post('/api/user')
            .send({
                email: 'invalid-email',
                password: 'Password@123',
                firstName: 'Test',
                lastName: 'User'
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });

    it('should not create a user with missing fields', (done) => {
        chai.request(app)
            .post('/api/user')
            .send({
                password: 'Password@123'
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                done();
            });
    });

    setTimeout(() => {
        process.exit(0);
      }, 5000); //

    
});
