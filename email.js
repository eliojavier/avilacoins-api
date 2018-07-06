let express = require('express');
let mailer = require('express-mailer');
let app = require('express')();
let emailConfig = require('./config/email.json');
let linksConfig = require('./config/links.json');

mailer.extend(app, {
  from: emailConfig.from,
  host: emailConfig.host,
  secureConnection: emailConfig.secureConnection,
  port: emailConfig.port,
  transportMethod: emailConfig.transportMethod,
  auth: {
    user: emailConfig.auth.user,
    pass: emailConfig.auth.pass
  }
});

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

module.exports = {
  welcomeEmail: function (user) {
    let configValidationLink = linksConfig.validationLink;
    let validationLink = configValidationLink + user.validation_token;
    let helper = require('sendgrid').mail;
    let from_email = new helper.Email('avilacoinsdev@gmail.com');
    let to_email = new helper.Email(user.email);
    let subject = '¡Verifica tu correo electrónico!';
    let content = new helper.Content('text/plain', 'Hola ' + user.name + ', por favor verifica tu cuenta haciendo click en el siguiente enlace: ' + validationLink);
    let mail = new helper.Mail(from_email, subject, to_email, content);

    let sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
    let request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    });

    sg.API(request, function (error, response) {
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
    });
  },
  approvedWithdrawEmail: function (user) {
    let helper = require('sendgrid').mail;
    let from_email = new helper.Email('avilacoinsdev@gmail.com');
    let to_email = new helper.Email(user.email);
    let subject = '¡Solicitud de canje realizada!';
    let content = new helper.Content('text/plain', 'Hola ' + user.name + ', Tu solicitud de canje ha sido procesada satisfactoriamente');
    let mail = new helper.Mail(from_email, subject, to_email, content);

    let sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
    let request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    });

    sg.API(request, function (error, response) {
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
    });
  },
  forgotPasswordEmail: function (user, token) {
    let resetPasswordLink = linksConfig.resetPasswordLink + token;
    let helper = require('sendgrid').mail;
    let from_email = new helper.Email('avilacoinsdev@gmail.com');
    let to_email = new helper.Email(user.email);
    let subject = 'Recuperación de contraseña';
    let content = new helper.Content('text/plain', 'Hola ' + user.name + ', por favor haz click en el siguiente enlace para recuperar tu contraseña: ' + resetPasswordLink);
    let mail = new helper.Mail(from_email, subject, to_email, content);

    let sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
    let request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    });

    sg.API(request, function (error, response) {
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
    });
  },
  promotionNotificationEmail: function (user, promotion, commerceType, receptor, location) {
    let helper = require('sendgrid').mail;
    let from_email = new helper.Email('avilacoinsdev@gmail.com');
    let to_email = new helper.Email(user.email);
    let subject = '¡Mira estas promociones!';
    let content = new helper.Content('text/html', '<p>Hola ' + user.name + ', mira estas promociones en ' + commerceType.name + ' que Ávila Coins tiene para ti: </p>' +
                                    '<h4>' + promotion.name + ': ' + promotion.description + '</h4>' +
                                    '<h3>' + receptor.name + '</h3>' +
                                    '<h4> Direccion: ' + receptor.address + '</h4>' +
                                    '<h4>' + location.state + ', ' + location.city + ', ' + location.zone + '</h4>');
    let mail = new helper.Mail(from_email, subject, to_email, content);

    let sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
    let request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    });

    sg.API(request, function (error, response) {
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
    });
  },
  receivedTransferEmail: function(user, receptor, transfer) {
    let helper = require('sendgrid').mail;
    let from_email = new helper.Email('avilacoinsdev@gmail.com');
    let to_email = new helper.Email(receptor.email);
    let subject = '¡Transferencia recibida!';
    let content = new helper.Content('text/html', '<p>Hola ' + receptor.name + ', has recibido una transferencia de ' + user.name + ' por ' + transfer.amount + ' puntos </p>');
    let mail = new helper.Mail(from_email, subject, to_email, content);

    let sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
    let request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    });

    sg.API(request, function (error, response) {
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
    });
  },
  sentTransferEmail: function (user, receptor, transfer) {
    let helper = require('sendgrid').mail;
    let from_email = new helper.Email('avilacoinsdev@gmail.com');
    let to_email = new helper.Email(user.email);
    let subject = '¡Transferencia enviada!';
    let content = new helper.Content('text/html', '<p>Hola ' + user.name + ', has enviado una transferencia a ' + receptor.name + ' por ' + transfer.amount +' puntos</p>');
    let mail = new helper.Mail(from_email, subject, to_email, content);

    let sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
    let request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    });

    sg.API(request, function (error, response) {
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
    });
  }
  // approvedWithdrawEmail: function (user) {
  //   app.mailer.send('approved-withdraw', {
  //     to: user.email, // REQUIRED. This can be a comma delimited string just like a normal email to field.
  //     subject: '¡Solicitud de canje realizada!', // REQUIRED.
  //     name: user.name,
  //   }, function (err) {
  //     if (err) {
  //       // handle error
  //       console.log('There was an error sending the email', err);
  //       return;
  //     }
  //     console.log("email sent");
  //   });
  // },
  // forgotPasswordEmail: function (user, token) {
  //   let resetPasswordLink = linksConfig.resetPasswordLink;
  //   app.mailer.send('forgot-password', {
  //     to: user.email,
  //     subject: 'Recuperación de contraseña',
  //     name: user.name,
  //     resetPasswordLink: resetPasswordLink + token
  //   }, function (err) {
  //     if (err) {
  //       // handle error
  //       console.log('There was an error sending the email', err);
  //       return;
  //     }
  //     console.log("email sent");
  //   });
  // }
};

