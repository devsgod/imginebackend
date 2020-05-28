const router = require('express').Router();
let Newsletter = require('../models/newsletter.model');
require('dotenv').config();

const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs').promises;
//send newsletter email
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendTestEmailConfirmation( email) {
  const mailOptions = {
      from: 'info@imaginesignage.com',
      to: 'paul@imaginesignage.com',
      subject: "Newsletter",
  };

  const fileLocation = path.join( __dirname, 'emails', 'newsletter.html' );
      
      let html = await fs.readFile( fileLocation, 'utf-8' );

      html = html.replace( '[(Email)]', email );
      html = html.replace( '[(Email)]', email );
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

// get all newS
router.route('/').get((req, res) => {
  Newsletter.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route   POST /contact/
// @access  Public
router.post('/', (req, res) => {
  const { email } = req.body;
  const status = "None";

  const newS = new Newsletter({
    email,
    status,
  });

  newS.save()
    .then(() => res.json(newS))
    .catch(err => res.status(400).json('Error: ' + err));
    
    // sending email if success
    sendTestEmailConfirmation(email);
});

// delete a user
router.route('/delete').post((req, res) => {
  const usersList = req.body;

  Newsletter.deleteMany({ _id: usersList }, function (err) {
    if (err) return handleError(err);
    // deleted at most one tank document
  });
});

module.exports = router;