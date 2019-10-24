'use strict';
const Promise = require('bluebird');
const faker = require('faker');
const models = require('../models');

const duplicatesValidations = Array(10).fill({}).map(item => {
  const initialSource = faker.random.arrayElement(['sudoc', 'hal', 'crossref', 'pubmed']);
  const initialId = faker.helpers.replaceSymbolWithNumber('########');
  const initialSourceId = `${initialSource}-${initialId}`;
  const targetSource = faker.random.arrayElement(['sudoc', 'hal', 'crossref', 'pubmed']);
  const targetId = faker.helpers.replaceSymbolWithNumber('########');
  const targetSourceId = `${targetSource}-${targetId}`;
  return {
    isDuplicate: faker.random.boolean(),
    initialSourceId,
    initialSource,
    targetSourceId,
    targetSource,
    comment: faker.lorem.sentence(10, 15),
    UserId: faker.random.number(100)
  };
});

module.exports = {
  up: () => {
    return models.sequelize.sync().then(() => {
      return models.Users.create({ email: faker.internet.email() }).then(user => {
        duplicatesValidations.forEach(duplicateValidation => {
          duplicateValidation.UserId = user.get('id');
        });
        return Promise.map(duplicatesValidations, duplicateValidation => {
          return models.DuplicatesValidations.create(duplicateValidation);
        });
      });
    });
  },
  down: () => {
    return Promise.resolve().then(() => {
      return models.sequelize.drop();
    });
  }
};
