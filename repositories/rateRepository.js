let db = require('../models');

module.exports = {
  findRatesByLocationId: function() {
    let location = 1; //Venezuela ID;
    return db.Rate.findOne({
      where: {
        fk_location: location
      }
    });
  }
};