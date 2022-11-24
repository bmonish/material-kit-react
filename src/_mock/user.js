import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  company: faker.company.name(),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  role: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer',
  ]),
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
