const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/app');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Health Check', () => {
  it('should return status ok', async () => {
    const res = await chai.request(app).get('/api/health');
    expect(res).to.have.status(200);
    expect(res.body.status).to.equal('ok');
  });
});
