let PromotionRepository = require('../repositories/promotionRepository');
let CommerceTypeRepository = require('../repositories/commerceTypeRepository');
let UserRepository = require('../repositories/userRepository');
let LocationRepository = require('../repositories/locationRepository');
let ageCalculator = require('age-calculator');
let {AgeFromDateString, AgeFromDate} = require('age-calculator');
let Email = require('../email');

module.exports = {
  create: function (user, promotion) {
    return PromotionRepository.create(user, promotion)
      .then(promotion => {
        let result = {};
        result.success = true;
        result.message = 'promotion created';
        return Promise.resolve(result);
      })
  },
  findAll: function () {
    return PromotionRepository.findAll()
      .then(promotions => {
        let today = new Date();
        promotions[0].forEach(function (promotion) {
          if (promotion.status === 'open') {
            let splitResult = promotion.end_date.split('/');
            let promotionDay = splitResult[0];
            let promotionMonth = splitResult[1];
            let promotionYear = splitResult[2];
            let promotionDate = new Date(promotionYear + '-' + promotionMonth + '-' + promotionDay);
            if (promotionDate < today) {
              return PromotionRepository.closePromotion(promotion.id);
            }
          }
        });
        let result = {};
        result.promotions = promotions;
        return Promise.resolve(result);
      })
  },
  findUserPromotions: function (user) {
    return PromotionRepository.findUserPromotions(user)
      .then(promotions => {
        let result = {};
        result.promotions = promotions;
        return Promise.resolve(result);
      })
  },
  validateName: function (user, name) {
    return PromotionRepository.validateName(user, name)
      .then(count => {
        let result = {};
        if (count > 0) {
          result.valid = false;
          return Promise.resolve(result);
        }
        result.valid = true;
        return Promise.resolve(result);
      })
  },
  target: function (promotion) {
    return PromotionRepository.target(promotion)
      .then(target => {
        let result = {};
        result.target = target;
        return Promise.resolve(result);
      })
  },
  updateStatus: function (promotion, id) {
    return PromotionRepository.updateStatus(promotion, id)
      .then(response => {
        let result = {};
        if (response[0]) {
          result.success = true;
          result.message = 'promotion status updated';
          return Promise.resolve(result);
        }
        result.success = false;
        result.message = 'promotion status not updated';
        return Promise.resolve(result);
      })
  },
  findUserPromotionById: function (user, id) {
    return PromotionRepository.findUserPromotionById(user, id)
      .then(promotion => {
        let result = {};
        result.promotion = promotion;
        return PromotionRepository.findPromotionsCategories(id)
          .then(response => {
            let categoriesIds = [];
            let categoriesNames = [];
            response.forEach(function (item) {
              categoriesIds.push(item.fk_commerce_type);
              categoriesNames.push(item.commerceType.name);
            });
            result.categoriesIds = categoriesIds;
            result.categoriesNames = categoriesNames;
            return Promise.resolve(result);
          });
      })
  },
  findById: function (id) {
    return PromotionRepository.findById(id)
      .then(promotion => {
        let result = {};
        result.promotion = promotion;
        return PromotionRepository.findPromotionsCategories(id)
          .then(response => {
            let categoriesIds = [];
            let categoriesNames = [];
            response.forEach(function (item) {
              categoriesIds.push(item.fk_commerce_type);
              categoriesNames.push(item.commerceType.name);
            });
            result.categoriesIds = categoriesIds;
            result.categoriesNames = categoriesNames;
            return Promise.resolve(result);
          });
      })
  },
  update: function (id, promotion, user) {
    return PromotionRepository.update(id, promotion, user)
      .then(response => {
        let result = {};
        result.success = true;
        result.message = 'promotion updated';
        return Promise.resolve(result);
      })
  },
  findAvailablePromotions: function (user, receptor) {
    if (receptor.type === 'commerce') {
      console.log('here');
      console.log(receptor.id);
      return LocationRepository.findByUserId(receptor.id)
        .then(location => {
          console.log('location:');
          let fullAddress = location[0][0];
          // console.log(location[0][0]);
          // console.log(location[0][0].zone);
          // console.log(location[0][0].city);
          // console.log(location[0][0].state);
          // console.log(location[0][0].address);
          return CommerceTypeRepository.findById(receptor.fk_commerce_type)
            .then(commerceType => {
              if (commerceType) {
                // console.log(commerceType.commercePromotions);
                let promotions = commerceType.commercePromotions;
                let userAge = new AgeFromDateString(user.birth_date).age;
                let gender = user.gender;
                promotions.forEach(function (promotion) {
                  // console.log('promotion status ' + promotion.status);
                  // console.log('promotion male ' + promotion.male);
                  // console.log('promotion status ' + promotion.female);
                  // console.log('min age ' + promotion.min_age);
                  // console.log('max age ' + promotion.max_age);
                  // console.log('userAge ' + userAge);
                  // console.log('gender ' + gender);
                  if (promotion.status === 'open' /*and date validation*/) {
                    // console.log('entre en promotion open');
                    // console.log(gender === 'M' && promotion.male || gender === 'F' && promotion.female);
                    // console.log(userAge >= promotion.min_age && userAge <= promotion.min_age);
                    if (gender === 'M' && promotion.male || gender === 'F' && promotion.female) {
                      if (userAge >= promotion.min_age && userAge <= promotion.max_age) {
                        Email.promotionNotificationEmail(user, promotion, commerceType, receptor, fullAddress);
                        // console.log('istarget');
                      }
                    }
                  }
                });
              }
            });
        });
    }
  }
};