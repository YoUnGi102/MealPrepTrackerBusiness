import { Given, When, Then } from '@cucumber/cucumber';
import { expect, use } from 'chai';
import app from '../../../src/server.js';
import {default as chaiHttp, request} from "chai-http";

use(chaiHttp);
let response: ChaiHttp.Response;

Given('the server is running', function () {
  // no-op
});

When('I request GET /api/health', async function () {
  response = await request.execute(app).get('/api/health');
});

Then('the response should be {int}', function (statusCode: number) {
  expect(response).to.have.status(statusCode);
});

Then('the response body should contain {string}', function (text: string) {
  expect(response.body.status).to.equal(text);
});
