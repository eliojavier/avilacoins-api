let PromotionRepository = require('../repositories/promotionRepository');

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
  }
};