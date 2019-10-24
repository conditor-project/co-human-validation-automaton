'use strict';
const models = require('./models');

const coHumanValidationAutomaton = {};
coHumanValidationAutomaton.doTheJob = function (docObject, next) {
  models.sequelize.sync().then(() => {
    console.log('sync ok !');
    return models.DuplicatesValidations.findAll();
  }).then(duplicatesValidation => {
    duplicatesValidation.map(duplicateValidation => console.log(duplicateValidation.dataValues));
  }).then(() => next())
    .catch(error => next(error));
};

module.exports = coHumanValidationAutomaton;
