'use strict';
const Promise = require('bluebird');
const faker = require('faker');
const sha1 = require('js-sha1');
const models = require('../models');

const duplicatesValidations = Array(10).fill({}).map(item => {
  const initialSource = faker.random.arrayElement(['sudoc', 'hal', 'crossref', 'pubmed']);
  const initialId = sha1(faker.lorem.sentence());
  const initialSourceId = `${initialSource}-${initialId}`;
  const targetSource = faker.random.arrayElement(['sudoc', 'hal', 'crossref', 'pubmed']);
  const targetId = sha1(faker.lorem.sentence());
  const targetSourceId = `${targetSource}-${targetId}`;
  return {
    // id: sha1(faker.lorem.sentence()),
    isDuplicate: faker.random.boolean(),
    initialSourceId,
    initialSource,
    initialIdConditor: sha1(faker.lorem.sentence()),
    targetSourceId,
    targetSource,
    targetIdConditor: sha1(faker.lorem.sentence()),
    comment: faker.lorem.sentence(10, 15),
    UserId: faker.random.number(100)
  };
});

module.exports = {
  up: () => {
    return models.sequelize.sync().then(() => {
      return models.Users.create({ email: 'bob@lennon.fr' }).then(user => {
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
