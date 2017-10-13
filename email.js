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
  }
};

