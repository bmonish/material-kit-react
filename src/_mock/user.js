import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  lastName: faker.name.lastName(),
  designation: sample(['Manager', 'Developer', 'Tester', 'Designer']),
  mandal: 'Mandal',
  district: sample(['District 1', 'District 2', 'District 3', 'District 4']),
  email: faker.internet.email(),
  state: sample(['TN', 'AP']),
  userType: sample(['Super Admin', 'Admin', 'User']),
  access: sample(['full', 'limited', 'denied', 'pending']),
}));

export default users;

export const dashBoardTableData = [...Array(4)].map((_, index) => ({
  id: faker.datatype.uuid(),
  timestamp: new Date().toLocaleDateString(),
  storeName: faker.company.companyName(),
  retailerCode: Math.floor(Math.random(6) * 10000),
  retailerName: faker.name.firstName(),
  depotCode: Math.floor(Math.random(6) * 10000),
  depotName: faker.name.firstName(),
  district: sample(['Rajahmundry', 'Vishakapatname']),
  status: sample(['Active', 'Inactive', 'Offline']),
}));

export const userTableData = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: faker.name.firstName(),
  lastName: faker.name.lastName(),
  userName: faker.internet.userName(),
  email: faker.internet.email(),
  designation: sample(['Manager', 'Developer', 'Tester', 'Designer']),
}));
