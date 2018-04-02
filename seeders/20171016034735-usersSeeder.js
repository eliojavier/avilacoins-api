'use strict';
let faker = require('faker');
let db = require('../models');

module.exports = {
  up: function (queryInterface, Sequelize) {
    let maleNamesArray = ["Benjamin", "Vicente", "Martín", "Matías", "Joaquín", "Agustín", "Pedro"];
    let femaleNamesArray = ["Sofía", "Florencia", "Antonella", "Amanda", "Camila", "Valentina", "Andrea"];
    let lastNameArray = ["González", "Rodríguez", "Gómez", "Fernández", "López", "Díaz",
                        "Martínez", "Pérez", "García", "Sánchez", "Romero", "Sosa", "Álvarez", "Torres"];
    let phonePrefixArray = ["0212", "0416", "0426", "0412", "0424"];

    return queryInterface.bulkInsert('User',
      [
        {
          name: "Usuario",
          last_name: "01",
          email: "usuario01@gmail.com",
          username: "usuario01",
          phone: "04261058185",
          birth_date: '',
          gender: 'M',
          profile_picture: null,
          doc_id: "17146579",
          rif: null,
          address: "san martin",
          status: "active",
          pin: "$2a$10$h3.I.sPyLXKNHhq0LmasQ.W.qf1dbQ8QYBXDepfidHoc90dYLxFOu",
          password: "$2a$10$n6knFFR2SAh.x9TcPVEuPu2RHJx.Ft.kODCmGEEJcxO7guMcofWuW",
          validation_token: null,
          password_token: null,
          email_notification: 0,
          sms_notification: 0,
          type: "user",
          role: "user",
          created_at: null,
          updated_at: null,
          fk_location: 6,
          fk_commerce_type: null,
        },
        {
          name: "Usuario",
          last_name: "02",
          email: "usuario02@gmail.com",
          username: "usuario02",
          phone: "04261058185",
          birth_date: '',
          gender: 'M',
          profile_picture: null,
          doc_id: "16300471",
          rif: null,
          address: "san martin",
          status: "active",
          pin: "$2a$10$h3.I.sPyLXKNHhq0LmasQ.W.qf1dbQ8QYBXDepfidHoc90dYLxFOu",
          password: "$2a$10$n6knFFR2SAh.x9TcPVEuPu2RHJx.Ft.kODCmGEEJcxO7guMcofWuW",
          validation_token: null,
          password_token: null,
          email_notification: 0,
          sms_notification: 0,
          type: "user",
          role: "user",
          created_at: null,
          updated_at: null,
          fk_location: 6,
          fk_commerce_type: null,
        },
        {
          name: faker.random.arrayElement(maleNamesArray),
          last_name: faker.random.arrayElement(lastNameArray),
          email: faker.internet.email(),
          username: faker.internet.userName(),
          phone: faker.random.arrayElement(phonePrefixArray) + faker.random.number({min:1001122, max: 9998762}).toString(),
          birth_date: '',
          gender: 'M',
          profile_picture: null,
          doc_id: faker.random.number({min:4123123, max: 22456123}).toString(),
          rif: null,
          address: "san martin",
          status: "active",
          pin: "$2a$10$h3.I.sPyLXKNHhq0LmasQ.W.qf1dbQ8QYBXDepfidHoc90dYLxFOu",
          password: "$2a$10$n6knFFR2SAh.x9TcPVEuPu2RHJx.Ft.kODCmGEEJcxO7guMcofWuW",
          validation_token: null,
          password_token: null,
          email_notification: 0,
          sms_notification: 0,
          type: "user",
          role: "user",
          created_at: null,
          updated_at: null,
          fk_location: 6,
          fk_commerce_type: null,
        },
        {
          name: faker.random.arrayElement(femaleNamesArray),
          last_name: faker.random.arrayElement(lastNameArray),
          email: faker.internet.email(),
          username: faker.internet.userName(),
          phone: faker.random.arrayElement(phonePrefixArray) + faker.random.number({min:1001122, max: 9998762}).toString(),
          birth_date: '',
          gender: 'F',
          profile_picture: null,
          doc_id: faker.random.number({min:4123123, max: 22456123}).toString(),
          rif: null,
          address: "san martin",
          status: "active",
          pin: "$2a$10$h3.I.sPyLXKNHhq0LmasQ.W.qf1dbQ8QYBXDepfidHoc90dYLxFOu",
          password: "$2a$10$n6knFFR2SAh.x9TcPVEuPu2RHJx.Ft.kODCmGEEJcxO7guMcofWuW",
          validation_token: null,
          password_token: null,
          email_notification: 0,
          sms_notification: 0,
          type: "user",
          role: "user",
          created_at: null,
          updated_at: null,
          fk_location: 6,
          fk_commerce_type: null,
        },
        {
          name: faker.random.arrayElement(femaleNamesArray),
          last_name: faker.random.arrayElement(lastNameArray),
          email: faker.internet.email(),
          username: faker.internet.userName(),
          phone: faker.random.arrayElement(phonePrefixArray) + faker.random.number({min:1001122, max: 9998762}).toString(),
          birth_date: '',
          gender: 'F',
          profile_picture: null,
          doc_id: faker.random.number({min:4123123, max: 22456123}).toString(),
          rif: null,
          address: "san martin",
          status: "active",
          pin: "$2a$10$h3.I.sPyLXKNHhq0LmasQ.W.qf1dbQ8QYBXDepfidHoc90dYLxFOu",
          password: "$2a$10$n6knFFR2SAh.x9TcPVEuPu2RHJx.Ft.kODCmGEEJcxO7guMcofWuW",
          validation_token: null,
          password_token: null,
          email_notification: 0,
          sms_notification: 0,
          type: "user",
          role: "user",
          created_at: null,
          updated_at: null,
          fk_location: 6,
          fk_commerce_type: null,
        },
        {
          name: faker.random.arrayElement(maleNamesArray),
          last_name: faker.random.arrayElement(lastNameArray),
          email: faker.internet.email(),
          username: faker.internet.userName(),
          phone: faker.random.arrayElement(phonePrefixArray) + faker.random.number({min:1001122, max: 9998762}).toString(),
          birth_date: '',
          gender: 'M',
          profile_picture: null,
          doc_id: faker.random.number({min:4123123, max: 22456123}).toString(),
          rif: null,
          address: "san martin",
          status: "active",
          pin: "$2a$10$h3.I.sPyLXKNHhq0LmasQ.W.qf1dbQ8QYBXDepfidHoc90dYLxFOu",
          password: "$2a$10$n6knFFR2SAh.x9TcPVEuPu2RHJx.Ft.kODCmGEEJcxO7guMcofWuW",
          validation_token: null,
          password_token: null,
          email_notification: 0,
          sms_notification: 0,
          type: "user",
          role: "user",
          created_at: null,
          updated_at: null,
          fk_location: 6,
          fk_commerce_type: null,
        },
        {
          name: faker.random.arrayElement(maleNamesArray),
          last_name: faker.random.arrayElement(lastNameArray),
          email: faker.internet.email(),
          username: faker.internet.userName(),
          phone: faker.random.arrayElement(phonePrefixArray) + faker.random.number({min:1001122, max: 9998762}).toString(),
          birth_date: '',
          gender: 'M',
          profile_picture: null,
          doc_id: faker.random.number({min:4123123, max: 22456123}).toString(),
          rif: null,
          address: "san martin",
          status: "active",
          pin: "$2a$10$h3.I.sPyLXKNHhq0LmasQ.W.qf1dbQ8QYBXDepfidHoc90dYLxFOu",
          password: "$2a$10$n6knFFR2SAh.x9TcPVEuPu2RHJx.Ft.kODCmGEEJcxO7guMcofWuW",
          validation_token: null,
          password_token: null,
          email_notification: 0,
          sms_notification: 0,
          type: "user",
          role: "user",
          created_at: null,
          updated_at: null,
          fk_location: 6,
          fk_commerce_type: null,
        },
        {
          name: faker.random.arrayElement(femaleNamesArray),
          last_name: faker.random.arrayElement(lastNameArray),
          email: faker.internet.email(),
          username: faker.internet.userName(),
          phone: faker.random.arrayElement(phonePrefixArray) + faker.random.number({min:1001122, max: 9998762}).toString(),
          birth_date: '',
          gender: 'F',
          profile_picture: null,
          doc_id: faker.random.number({min:4123123, max: 22456123}).toString(),
          rif: null,
          address: "san martin",
          status: "active",
          pin: "$2a$10$h3.I.sPyLXKNHhq0LmasQ.W.qf1dbQ8QYBXDepfidHoc90dYLxFOu",
          password: "$2a$10$n6knFFR2SAh.x9TcPVEuPu2RHJx.Ft.kODCmGEEJcxO7guMcofWuW",
          validation_token: null,
          password_token: null,
          email_notification: 0,
          sms_notification: 0,
          type: "user",
          role: "user",
          created_at: null,
          updated_at: null,
          fk_location: 6,
          fk_commerce_type: null,
        },
        {
          name: faker.random.arrayElement(femaleNamesArray),
          last_name: faker.random.arrayElement(lastNameArray),
          email: faker.internet.email(),
          username: faker.internet.userName(),
          phone: faker.random.arrayElement(phonePrefixArray) + faker.random.number({min:1001122, max: 9998762}).toString(),
          birth_date: '',
          gender: 'F',
          profile_picture: null,
          doc_id: faker.random.number({min:4123123, max: 22456123}).toString(),
          rif: null,
          address: "san martin",
          status: "active",
          pin: "$2a$10$h3.I.sPyLXKNHhq0LmasQ.W.qf1dbQ8QYBXDepfidHoc90dYLxFOu",
          password: "$2a$10$n6knFFR2SAh.x9TcPVEuPu2RHJx.Ft.kODCmGEEJcxO7guMcofWuW",
          validation_token: null,
          password_token: null,
          email_notification: 0,
          sms_notification: 0,
          type: "user",
          role: "user",
          created_at: null,
          updated_at: null,
          fk_location: 6,
          fk_commerce_type: null,
        },
        {
          name: faker.random.arrayElement(maleNamesArray),
          last_name: faker.random.arrayElement(lastNameArray),
          email: faker.internet.email(),
          username: faker.internet.userName(),
          phone: faker.random.arrayElement(phonePrefixArray) + faker.random.number({min:1001122, max: 9998762}).toString(),
          birth_date: '',
          gender: 'M',
          profile_picture: null,
          doc_id: faker.random.number({min:4123123, max: 22456123}).toString(),
          rif: null,
          address: "san martin",
          status: "active",
          pin: "$2a$10$h3.I.sPyLXKNHhq0LmasQ.W.qf1dbQ8QYBXDepfidHoc90dYLxFOu",
          password: "$2a$10$n6knFFR2SAh.x9TcPVEuPu2RHJx.Ft.kODCmGEEJcxO7guMcofWuW",
          validation_token: null,
          password_token: null,
          email_notification: 0,
          sms_notification: 0,
          type: "user",
          role: "user",
          created_at: null,
          updated_at: null,
          fk_location: 6,
          fk_commerce_type: null,
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