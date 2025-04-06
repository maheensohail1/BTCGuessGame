import request from 'supertest';
import app from '../src/server'; // or wherever your Express app is exported

describe('GET /price', () => {
  it('should return BTC price or 503', async () => {
    const res = await request(app).get('/price');
    expect([200, 503]).toContain(res.statusCode); // allow both real and fallback
  });
});
