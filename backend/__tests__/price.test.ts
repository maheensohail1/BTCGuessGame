import request from 'supertest'; // Importing the supertest library to make HTTP requests for testing
import app from '../src/server'; // Importing the Express app to test the routes


describe('GET /price', () => {
    // Describes the test suite for the /price endpoint
  it('should return BTC price or 503', async () => {
     // Test case: Verify that the /price endpoint returns a 200 status or 503 if unavailable
     const res = await request(app).get('/price'); // Send a GET request to /price
     expect([200, 503]).toContain(res.statusCode); // Check if the response status code is either 200 or 503
     // 200 means the price was fetched successfully, 503 means the service is unavailable
  });
});
