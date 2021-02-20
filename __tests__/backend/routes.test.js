const request = require('supertest');
const sampleURI = require('../../server/controllers/testPSQL');
const app = require('../../server/server');


describe('Route integration', () => {
  describe('/', () => {
    describe('GET -> Homepage', () => {
      it('responds with 200 status and text/html content type', (done) => {
        return request(app)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200, done);
      });
    });
  })

  describe('/psql', () => {
    describe('POST -> postgres URI', () => {
      it('responds with 200 status and application/json content type with psqlURI passed in req body', (done) => {
        return request(app)
          .post('/psql')
          .send({ psqlURI: sampleURI })
          .expect('Content-type', /application\/json/)
          .expect(200, done)
      })

      it('responds with 200 status and application/json content type with sample passed in req body', (done) => {
        return request(app)
          .post('/psql')
          .send({ sample: true })
          .expect('Content-Type', /application\/json/)
          .expect(200, done)
      })
      
      it('properties dbName, schema, advice, and d3Data are in body of response', (done) => {
        return request(app)
          .post('/psql')
          .send({ psqlURI: sampleURI })
          .expect(200)
          .expect('Content-Type', /application\/json/)
          .then(({ body }) => {
            expect(body).toHaveProperty('dbName');
            expect(body).toHaveProperty('schema');
            expect(body).toHaveProperty('advice');
            expect(body).toHaveProperty('d3Data');
            return done();
          })
      })  

        it('responds with \'psql\' as dbName', (done) => {
          return request(app)
            .post('/psql')
            .send({ psqlURI: sampleURI })
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .then(({ body }) => {
              expect(body.dbName).toEqual('psql');
              return done();
            })
        })
      
        it('responds to invalid request with 400 status and error message in body', (done) => {
          return request(app)
            .post('/psql')
            .send({ psqlURI: 'not a URI' })
            .expect(400)
            .expect('Content-Type', /application\/json/)
            .then(({ body }) => {
              expect(body).toHaveProperty('err');
              return done();
            })
        })

        
    })
  })
}) 