'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('User',
      [
        {
          name: "Admin",
          last_name: "01",
          email: "admin01@gmail.com",
          username: "admin01",
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
          role: "admin",
          created_at: null,
          updated_at: null,
          fk_location: 6,
          fk_commerce_type: null,
        },
        {
          name: "Admin",
          last_name: "02",
          email: "admin02@gmail.com",
          username: "admin02",
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
          role: "admin",
          created_at: null,
          updated_at: null,
          fk_location: 6,
          fk_commerce_type: null,
        },
        {
          name: "superadmin",
          last_name: "01",
          email: "superadmin01@gmail.com",
          username: "superadmin01",
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
          role: "superadmin",
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
