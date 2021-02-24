import axios from 'axios';
require('dotenv-flow').config();
import { clientName } from '../tests/createNewClient.spec';
import { Sequelize, QueryTypes } from 'sequelize';

before( async () =>{
    await userAuth();
});

after(async function () {
    this.timeout(15000);
    console.log('after Hook');
    const clientID = await archiveCreatedClient(clientName);
    console.log(clientID.id);
  });

export async function userAuth() {
    const url = process.env.ENVIRONMENT;
    const username = process.env.USERNAME_ADMIN;
    const password = process.env.USER_PASSWORD;
    const usernamePasswordBuffer = Buffer.from(username + ':' + password);
    const base64data = usernamePasswordBuffer.toString('base64');
    const axiosBasicAuth = axios.create({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${base64data}`,
      },
    });
    await axiosBasicAuth.get(url);
    //set global default headers for all requests  
    axios.defaults.baseURL = process.env.ENVIRONMENT;
    axios.defaults.headers = {
        Authorization: `Basic ${base64data}`,
        'X-Authorization': 'userId=1&role=admins',
    };
}
export async function archiveCreatedClient(organizationName) {
    const sequelize = new Sequelize(
      process.env.DATABASE_NAME,
      process.env.DATABASE_USER_NAME,
      process.env.DATABASE_USER_PASS,
      {
        host: process.env.DATABASE_HOST,
        dialect: 'mssql',
        dialectOptions: {
          options: {
            validateBulkLoadParameters: true,
          },
        },
      },
    );
    const clientId = await sequelize.query(
      `select id from client where organization='${organizationName}'`,
      {
        plain: true,
        type: QueryTypes.SELECT,
      },
    );
    /*ARCHIVING CLIENT*/
    await sequelize.query(
      `update client 
      set archivedOn = '2020.12.21 09:00:00'
      where organization='${organizationName}'`,
      {
        plain: true,
        type: QueryTypes.UPDATE,
      },
    );
    return clientId;
  }