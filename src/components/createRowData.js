import faker from "faker";

function createFakeRow(index) {
  return {
    serailNum: index + 1,
    clientId: faker.datatype.number(),
    name: faker.name.firstName(),
    email: faker.internet.email(),
    phoneNum: faker.phone.phoneNumberFormat(),
    brandName: faker.company.companyName(),
    status: 'pending',
    // actions: 'actions',
    firstName: faker.name.firstName(),
  }
}

export default function createRowData(count) {
  return [...Array(count).keys()].map(i => createFakeRow(i));
}
