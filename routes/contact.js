const router = require('express').Router();
// const bcrypt = require('bcryptjs');
require('dotenv').config();

// send email
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const path = require('path');
const fs = require('fs').promises;
// user model
let Contact = require('../models/contact.model');

async function sendTestEmailConfirmation(name, email, phone, subject, message) {
  const mailOptions = {
      from: 'info@imaginesignage.com',
      to: 'paul@imaginesignage.com',
      subject: subject,
  };

  const fileLocation = path.join( __dirname, 'emails', 'contact.html' );
      
      let html = await fs.readFile( fileLocation, 'utf-8' );

      html = html.replace( '[(Name)]', name );
      html = html.replace( '[(Name)]', name );
      html = html.replace( '[(Email)]', email );
      html = html.replace( '[(Phone)]', phone );
      html = html.replace( '[(Subject)]', subject );
      html = html.replace( '[(Message)]', message );

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
router.route('/').get((req, res) => {
  Contact.find()
    .then(contact => res.json(contact))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/', (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  console.log(req.body);

  //Simple validation
  if (!name || !email || !phone || !subject || !message) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

    const newContact = new Contact({
      name,
      email,
      phone,
      subject,
      message
    });

      newContact.save()
      .then(() => {
      // sending email if success
      // sendTestEmailConfirmation(name, email, phone, subject, message);

        res.json({
          msg:"Save Successfully!",
          contact: {
            username: name,
            email: email
          }
        });
      });
    
});

module.exports = router;