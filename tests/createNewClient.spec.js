import { expect } from 'chai';
import { createClient } from '../sourceBooksApis/clientApi';
import 'chai-http';
import * as chai from 'chai';
chai.use(require('chai-http'));
export let clientName;

describe('Client create test suite', async () => {
  it('Should test that it is possible to create new client', async () => {
    const timestamp = new Date().toLocaleString();
    clientName = `Name of organization${timestamp}`;
    const responseFromClientCreate = await createClient(clientName);
    expect(responseFromClientCreate).to.have.status(200);
    expect(responseFromClientCreate.data).to.haveOwnProperty('clientId').to.be
      .not.null;
  });
  
  it('Should test that it is not possible to create new client', async () => {
    const notValidClientName = '';
    const responseFromClientCreate = await createClient(notValidClientName);
    expect(responseFromClientCreate).to.have.status(400);
    expect(responseFromClientCreate.data)
      .to.haveOwnProperty('message')
      .equals('Invalid body, check \'errors\' property for more info.');
  });
});