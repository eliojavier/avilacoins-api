'use strict';
let faker = require('faker');

module.exports = {
  up: function (queryInterface, Sequelize) {
    let phonePrefixArray = ["0212", "0416", "0426", "0412", "0424"];
    let namePrefixArray = ["Grupo"];

    return queryInterface.bulkInsert('User',
      [
        {
          name: faker.random.arrayElement(namePrefixArray) + " " + faker.lorem.words,
          last_name: null,
          email: faker.internet.email(),
          username: faker.internet.userName(),
          phone: faker.random.arrayElement(phonePrefixArray) + faker.random.number({min:1001122, max: 9998762}).toString(),
          birth_date: null,
          gender: null,
          profile_picture: null,
          doc_id: null,
          rif: "J" + faker.random.number({min:123001100, max: 778998457}).toString(),
          address: "san martin",
          status: "active",
          pin: "$2a$10$h3.I.sPyLXKNHhq0LmasQ.W.qf1dbQ8QYBXDepfidHoc90dYLxFOu",
          password: "$2a$10$n6knFFR2SAh.x9TcPVEuPu2RHJx.Ft.kODCmGEEJcxO7guMcofWuW",
          validation_token: null,
          password_token: null,
          email_notification: 0,
          sms_notification: 0,
          type: "commerce",
          role: "user",
          created_at: null,
          updated_at: null,
          fk_location: 6,
          fk_commerce_type: faker.random.number({min:1, max:7})
        },
        {
          name: faker.company.companyName(),
          last_name: null,
          email: faker.internet.email(),
          username: faker.internet.userName(),
          phone: faker.random.arrayElement(phonePrefixArray) + faker.random.number({min:1001122, max: 9998762}).toString(),
          birth_date: null,
          gender: null,
          profile_picture: null,
          doc_id: null,
          rif: "J" + faker.random.number({min:123001100, max: 778998457}).toString(),
          address: "san martin",
          status: "active",
          pin: "$2a$10$h3.I.sPyLXKNHhq0LmasQ.W.qf1dbQ8QYBXDepfidHoc90dYLxFOu",
          password: "$2a$10$n6knFFR2SAh.x9TcPVEuPu2RHJx.Ft.kODCmGEEJcxO7guMcofWuW",
          validation_token: null,
          password_token: null,
          email_notification: 0,
          sms_notification: 0,
          type: "commerce",
          role: "user",
          created_at: null,
          updated_at: null,
          fk_location: 6,
          fk_commerce_type: faker.random.number({min:1, max:7})
        },
        {
          name: faker.company.companyName(),
          last_name: null,
          email: faker.internet.email(),
          username: faker.internet.userName(),
          phone: faker.random.arrayElement(phonePrefixArray) + faker.random.number({min:1001122, max: 9998762}).toString(),
          birth_date: null,
          gender: null,
          profile_picture: null,
          doc_id: null,
          rif: "J" + faker.random.number({min:123001100, max: 778998457}).toString(),
          address: "san martin",
          status: "active",
          pin: "$2a$10$h3.I.sPyLXKNHhq0LmasQ.W.qf1dbQ8QYBXDepfidHoc90dYLxFOu",
          password: "$2a$10$n6knFFR2SAh.x9TcPVEuPu2RHJx.Ft.kODCmGEEJcxO7guMcofWuW",
          validation_token: null,
          password_token: null,
          email_notification: 0,
          sms_notification: 0,
          type: "commerce",
          role: "user",
          created_at: null,
          updated_at: null,
          fk_location: 6,
          fk_commerce_type: faker.random.number({min:1, max:7})
        },
        {
          name: faker.company.companyName(),
          last_name: null,
          email: faker.internet.email(),
          username: faker.internet.userName(),
          phone: faker.random.arrayElement(phonePrefixArray) + faker.random.number({min:1001122, max: 9998762}).toString(),
          birth_date: null,
          gender: null,
          profile_picture: null,
          doc_id: null,
          rif: "J" + faker.random.number({min:123001100, max: 778998457}).toString(),
          address: "san martin",
          status: "active",
          pin: "$2a$10$h3.I.sPyLXKNHhq0LmasQ.W.qf1dbQ8QYBXDepfidHoc90dYLxFOu",
          password: "$2a$10$n6knFFR2SAh.x9TcPVEuPu2RHJx.Ft.kODCmGEEJcxO7guMcofWuW",
          validation_token: null,
          password_token: null,
          email_notification: 0,
          sms_notification: 0,
          type: "commerce",
          role: "user",
          created_at: null,
          updated_at: null,
          fk_location: 6,
          fk_commerce_type: faker.random.number({min:1, max:7})
        },
        {
          name: faker.company.companyName(),
          last_name: null,
          email: faker.internet.email(),
          username: faker.internet.userName(),
          phone: faker.random.arrayElement(phonePrefixArray) + faker.random.number({min:1001122, max: 9998762}).toString(),
          birth_date: null,
          gender: null,
          profile_picture: null,
          doc_id: null,
          rif: "J" + faker.random.number({min:123001100, max: 778998457}).toString(),
          address: "san martin",
          status: "active",
          pin: "$2a$10$h3.I.sPyLXKNHhq0LmasQ.W.qf1dbQ8QYBXDepfidHoc90dYLxFOu",
          password: "$2a$10$n6knFFR2SAh.x9TcPVEuPu2RHJx.Ft.kODCmGEEJcxO7guMcofWuW",
          validation_token: null,
          password_token: null,
          email_notification: 0,
          sms_notification: 0,
          type: "commerce",
          role: "user",
          created_at: null,
          updated_at: null,
          fk_location: 6,
          fk_commerce_type: faker.random.number({min:1, max:7})
        },
        {
          name: faker.company.companyName(),
          last_name: null,
          email: faker.internet.email(),
          username: faker.internet.userName(),
          phone: faker.random.arrayElement(phonePrefixArray) + faker.random.number({min:1001122, max: 9998762}).toString(),
          birth_date: null,
          gender: null,
          profile_picture: null,
          doc_id: null,
          rif: "J" + faker.random.number({min:123001100, max: 778998457}).toString(),
          address: "san martin",
          status: "active",
          pin: "$2a$10$h3.I.sPyLXKNHhq0LmasQ.W.qf1dbQ8QYBXDepfidHoc90dYLxFOu",
          password: "$2a$10$n6knFFR2SAh.x9TcPVEuPu2RHJx.Ft.kODCmGEEJcxO7guMcofWuW",
          validation_token: null,
          password_token: null,
          email_notification: 0,
          sms_notification: 0,
          type: "commerce",
          role: "user",
          created_at: null,
          updated_at: null,
          fk_location: 6,
          fk_commerce_type: faker.random.number({min:1, max:7})
        },
        {
          name: faker.company.companyName(),
          last_name: null,
          email: faker.internet.email(),
          username: faker.internet.userName(),
          phone: faker.random.arrayElement(phonePrefixArray) + faker.random.number({min:1001122, max: 9998762}).toString(),
          birth_date: null,
          gender: null,
          profile_picture: null,
          doc_id: null,
          rif: "J" + faker.random.number({min:123001100, max: 778998457}).toString(),
          address: "san martin",
          status: "active",
          pin: "$2a$10$h3.I.sPyLXKNHhq0LmasQ.W.qf1dbQ8QYBXDepfidHoc90dYLxFOu",
          password: "$2a$10$n6knFFR2SAh.x9TcPVEuPu2RHJx.Ft.kODCmGEEJcxO7guMcofWuW",
          validation_token: null,
          password_token: null,
          email_notification: 0,
          sms_notification: 0,
          type: "commerce",
          role: "user",
          created_at: null,
          updated_at: null,
          fk_location: 6,
          fk_commerce_type: faker.random.number({min:1, max:7})
        },
        {
          name: faker.company.companyName(),
          last_name: null,
          email: faker.internet.email(),
          username: faker.internet.userName(),
          phone: faker.random.arrayElement(phonePrefixArray) + faker.random.number({min:1001122, max: 9998762}).toString(),
          birth_date: null,
          gender: null,
          profile_picture: null,
          doc_id: null,
          rif: "J" + faker.random.number({min:123001100, max: 778998457}).toString(),
          address: "san martin",
          status: "active",
          pin: "$2a$10$h3.I.sPyLXKNHhq0LmasQ.W.qf1dbQ8QYBXDepfidHoc90dYLxFOu",
          password: "$2a$10$n6knFFR2SAh.x9TcPVEuPu2RHJx.Ft.kODCmGEEJcxO7guMcofWuW",
          validation_token: null,
          password_token: null,
          email_notification: 0,
          sms_notification: 0,
          type: "commerce",
          role: "user",
          created_at: null,
          updated_at: null,
          fk_location: 6,
          fk_commerce_type: faker.random.number({min:1, max:7})
        },
        {
          name: faker.company.companyName(),
          last_name: null,
          email: faker.internet.email(),
          username: faker.internet.userName(),
          phone: faker.random.arrayElement(phonePrefixArray) + faker.random.number({min:1001122, max: 9998762}).toString(),
          birth_date: null,
          gender: null,
          profile_picture: null,
          doc_id: null,
          rif: "J" + faker.random.number({min:123001100, max: 778998457}).toString(),
          address: "san martin",
          status: "active",
          pin: "$2a$10$h3.I.sPyLXKNHhq0LmasQ.W.qf1dbQ8QYBXDepfidHoc90dYLxFOu",
          password: "$2a$10$n6knFFR2SAh.x9TcPVEuPu2RHJx.Ft.kODCmGEEJcxO7guMcofWuW",
          validation_token: null,
          password_token: null,
          email_notification: 0,
          sms_notification: 0,
          type: "commerce",
          role: "user",
          created_at: null,
          updated_at: null,
          fk_location: 6,
          fk_commerce_type: faker.random.number({min:1, max:7})
        },
        {
          name: faker.company.companyName(),
          last_name: null,
          email: faker.internet.email(),
          username: faker.internet.userName(),
          phone: faker.random.arrayElement(phonePrefixArray) + faker.random.number({min:1001122, max: 9998762}).toString(),
          birth_date: null,
          gender: null,
          profile_picture: null,
          doc_id: null,
          rif: "J" + faker.random.number({min:123001100, max: 778998457}).toString(),
          address: "san martin",
          status: "active",
          pin: "$2a$10$h3.I.sPyLXKNHhq0LmasQ.W.qf1dbQ8QYBXDepfidHoc90dYLxFOu",
          password: "$2a$10$n6knFFR2SAh.x9TcPVEuPu2RHJx.Ft.kODCmGEEJcxO7guMcofWuW",
          validation_token: null,
          password_token: null,
          email_notification: 0,
          sms_notification: 0,
          type: "commerce",
          role: "user",
          created_at: null,
          updated_at: null,
          fk_location: 6,
          fk_commerce_type: faker.random.number({min:1, max:7})
        }
      ])
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
