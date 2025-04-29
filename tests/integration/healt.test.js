import { expect, use } from 'chai';
import app from '../../src/server.js';
import { default as chaiHttp, request } from "chai-http";
import { describe, it } from 'node:test';
use(chaiHttp);
describe('Health Check', () => {
    it('should return status ok', async () => {
        const res = await request.execute(app).get('/api/health');
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('ok');
    });
});
