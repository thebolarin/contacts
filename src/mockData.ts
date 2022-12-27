import { faker } from '@faker-js/faker';

export const viewContactMockData: any = () => {
  return [
    {
      "_id": "63aa9907e98d0a6c4c2350cf",
      "firstName": faker.name.firstName(),
      "lastName": faker.name.lastName(),
      "email": faker.internet.email(),
      "phoneNumber": faker.phone.number('+48 91 ### ## ##'),
      "createdAt": "2022-12-27T07:04:39.548Z",
      "updatedAt": "2022-12-27T07:04:39.548Z",
      "version": 0
    }
  ]
}

export const editContactMockData = () => {
  return {
    contact: {
      "_id": "63aa9907e98d0a6c4c2350cf",
      "firstName": faker.name.firstName(),
      "lastName": faker.name.lastName(),
      "email": faker.internet.email(),
      "phoneNumber": faker.phone.number('+48 91 ### ## ##'),
      "createdAt": "2022-12-27T07:04:39.548Z",
      "updatedAt": "2022-12-27T07:04:39.548Z",
      "version": 0
    },
    contactEditHistory: [{
      "_id": "63aa9907e98d0a6c4c2350cf",
      data: {
        "firstName": faker.name.firstName(),
        "lastName": faker.name.lastName(),
        "email": faker.internet.email(),
        "phoneNumber": faker.phone.number('+48 91 ### ## ##')
      },
      "createdAt": "2022-12-27T07:04:39.548Z",
      "updatedAt": "2022-12-27T07:04:39.548Z",
      "version": 0
    }]
  }
}