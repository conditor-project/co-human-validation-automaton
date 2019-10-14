'use strict';
const coHumanValidationAutomaton = {};

coHumanValidationAutomaton.doTheJob = function (docObject, next) {
  console.log('do something, dude !');
  next();
};

module.exports = coHumanValidationAutomaton;
