let express = require('express');
let mailer = require('express-mailer');
let app = require('express')();
let emailConfig = require('./config/email.json');
let linksConfig = require('./config/links.json');

// mailer.extend(app, {
//   from: 'contacto@testing.info.ve',
//   host: 'mail.testing.info.ve', // hostname
//   secureConnection: false, // use SSL
//   port: 587, // port for secure SMTP
//   transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
//   auth: {
//     user: 'contacto@testing.info.ve',
//     pass: 'avilacoins2017*'
//   }
// });

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
  sendgridWelcomeEmail: function (user) {
    let configValidationLink = linksConfig.validationLink;
    let validationLink = configValidationLink + user.validation_token;
    var helper = require('sendgrid').mail;
    let from_email = new helper.Email('avilacoinsdev@gmail.com');
    let to_email = new helper.Email(user.email);
    let subject = '¡Verifica tu correo electrónico!';
    let content = new helper.Content('text/plain', 'Hola' + user.name + ', por favor verifica tu cuenta haciendo click en el siguiente enlace: ' + validationLink);
    let mail = new helper.Mail(from_email, subject, to_email, content);

    let sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
    let request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    });

    sg.API(request, function(error, response) {
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
    });
  },
  welcomeEmail: function (user) {
    let validationLink = linksConfig.validationLink;
    app.mailer.send('confirm-email', {
      to: user.email, // REQUIRED. This can be a comma delimited string just like a normal email to field.
      subject: '¡Verifica tu correo electrónico!', // REQUIRED.
      name: user.name,
      validationLink: validationLink + user.validation_token
    }, function (err) {
      if (err) {
        // handle error
        console.log('There was an error sending the email', err);
        return;
      }
      console.log("email sent");
    });
  },
  approvedWithdrawEmail: function (user) {
    app.mailer.send('approved-withdraw', {
      to: user.email, // REQUIRED. This can be a comma delimited string just like a normal email to field.
      subject: '¡Solicitud de canje realizada!', // REQUIRED.
      name: user.name,
    }, function (err) {
      if (err) {
        // handle error
        console.log('There was an error sending the email', err);
        return;
      }
      console.log("email sent");
    });
  },
  forgotPasswordEmail: function (user, token) {
    let resetPasswordLink = linksConfig.resetPasswordLink;
    app.mailer.send('forgot-password', {
      to: user.email,
      subject: 'Recuperación de contraseña',
      name: user.name,
      resetPasswordLink: resetPasswordLink + token
    }, function (err) {
      if (err) {
        // handle error
        console.log('There was an error sending the email', err);
        return;
      }
      console.log("email sent");
    });
  }
};

