const app = require("./utils/express_test_routes").app,
      request = require("supertest"),
      expect = require("expect");

describe('SERVER', function() {
    describe('GET /', function() {
        it('should return an error', function(done) {
        request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body).toMatchObject({
                    error: expect.stringMatching(/Page/)
                })
            })
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });
    });

    describe('GET /users', function() {
        it('should return my user object', function(done) {
        request(app)
            .get('/users')
            .set('Accept', 'application/json')
            .expect(200)
            .expect((res) => {
                // arrayContaining accepts only array - and objectContaining accepts only objects
                expect(res.body).toEqual(expect.arrayContaining ([{
                        name: 'Andrew',
                        age: 25
                    }])
                )
            })
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });
    });

    describe('GET /user', function() {
        it('should return a user object', function(done) {
        request(app)
            .get('/user')
            .set('Accept', 'application/json')
            .expect(200)
            .expect((res) => {
                // arrayContaining accepts only array - and objectContaining accepts only objects
                expect(res.body).toEqual(expect.objectContaining ({
                        name: 'Andrew'
                    })
                )
            })
            .end(function(err, res) {
                if (err) return done(err);
                done();
            });
        });
    });
});