'use strict';
/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
const pkg = require('../package.json');
const path = require('path');
const Umzug = require('umzug');
const models = require('../models');
const { expect } = require('chai');
const coHumanValidationAutomaton = require('../index.js');
const umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: {
    sequelize: models.sequelize
  },
  migrations: {
    params: [models.sequelize.getQueryInterface(), models.Sequelize],
    pattern: /\.js$/,
    path: path.join(__dirname, '../seeders')
  }
});

describe(pkg.name + '/index.js', function () {
  describe('doTheJob', function () {
    before(function () {
      return umzug.down().then(() => umzug.up());
    });

    it('should do something', function (done) {
      coHumanValidationAutomaton.doTheJob({}, (error) => {
        if (error) return done(error);
        expect(true).to.be.true;
        done();
      });
    });

    after(function () {
      return umzug.down();
    });
  });
});
