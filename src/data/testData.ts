import { faker } from "@faker-js/faker";

export function createTestUser() {
  return {
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 12 }),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    company: faker.company.name(),
    address: faker.location.streetAddress(),
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode(),
    mobile: faker.phone.number(),
  };
}
