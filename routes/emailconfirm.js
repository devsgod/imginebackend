const router = require('express').Router();
// const bcrypt = require('bcryptjs');
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

let User = require('../models/user.model');

// send email

const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs').promises;

async function sendTestEmailConfirmation(email) {
  const mailOptions = {
      from: 'info@imaginesignage.com',
      to: email,
      subject: "Thank you for joining us!",
  };

  const fileLocation = path.join( __dirname, 'emails', 'registered.html' );

      
      let html = await fs.readFile( fileLocation, 'utf-8' );

      // html = html.replace( '[(Name)]', name );
      // html = html.replace( '[(Name)]', name );
      // html = html.replace( '[(Email)]', email );
      // html = html.replace( '[(Phone)]', phone );
      // html = html.replace( '[(Subject)]', subject );
      // html = html.replace( '[(Message)]', message );

      mailOptions.html = html;

      sgMail
      .send(mailOptions)
      .then(() => {
        console.log("Nice");
      }, error => {
        console.error(error);
        if (error.response) {
          console.error(error.response.body)
        }
      });
  
}

// @route   POST /contact/
// @access  Public
router.get('/:id', (req, res) => {
  let id = req.params.id;

  User.findById(id, function(err, user) {
    // console.log("user2", user);
    //res.json(user);
    // sending email if success
    sendTestEmailConfirmation(user.email);

    //dev
    // res.redirect('http://localhost:3030/success');
    //prod
    res.redirect(process.env.MAIL_SUCCESS);
    
  });

  
});

module.exports = router;