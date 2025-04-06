const { Given, When, Then } = require('@cucumber/cucumber');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../src/app');

chai.use(chaiHttp);
const expect = chai.expect;

let response;

Given('the server is running', function () {});

When('I request GET /api/health', async function () {
  response = await chai.request(app).get('/api/health');
});

Then('the response should be {int}', function (statusCode) {
  expect(response).to.have.status(statusCode);
});

Then('the response body should contain {string}', function (text) {
  expect(response.body.status).to.equal(text);
});
