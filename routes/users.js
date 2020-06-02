const router = require('express').Router();
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');

// send email
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const path = require('path');
const fs = require('fs').promises;

async function sendTestEmailConfirmation(user) {

  const mailOptions = {
      from: 'info@imaginesignage.com',
      to: user.email,
      // replyTo: 'Signup@imagineignage.com', 
      subject: "Welcome!",
      text:"Imagine Signage"
  };

  const fileLocation = path.join( __dirname, 'emails', 'emailverification.html' );
    
  let html = await fs.readFile( fileLocation, 'utf-8' );

    html = html.replace( '[(ConfirmURL)]', process.env.MAIL_SUCCESS + "?id=" + user.id );
    html = html.replace( 'xxxx', user.firstName + " " + user.lastName );
    
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

//Send Welcome
async function sendSuccessEmail(user, username, password, login_url) {

  const mailOptions = {
      from: 'info@imaginesignage.com',
      to: user.email,
      // replyTo: 'Signup@imagineignage.com', 
      subject: "Successfully Registered!"
  };

  const fileLocation = path.join( __dirname, 'emails', 'success.html' );
    
  let html = await fs.readFile( fileLocation, 'utf-8' );

    // html = html.replace( '[(ConfirmURL)]', process.env.MAIL_SUCCESS + "?id=" + user.id );
    html = html.replace( 'firstName', user.firstName );
    html = html.replace( 'lastName', user.lastName );
    html = html.replace( 'login_url', login_url );
    html = html.replace( 'login_username', username );
    html = html.replace( 'login_password', password );
    
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

// user model
let User = require('../models/user.model');

// get all users
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route   POST /users/
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
  const { username, email, password, firstName, lastName, mobile, accountname, businesstype, msg, companyName } = req.body;

  console.log("body", req.body);

  // Simple validation
  if(!username || !email || !password || !firstName || !lastName || !mobile ||!accountname || !msg || !companyName || !businesstype) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  User.findOne({ email })
    .then(user => {
      if(user) return res.status(200).json({ msg: 'User already exists' });
      
      const newUser = new User({
        username,
        email,
        password,
        firstName,
        lastName,
        mobile,
        accountname,
        businesstype,
        msg,
        companyName,
      });

      // Create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => {

              jwt.sign(
                { id: user.id },
                process.env.jwtSecret,
                { expiresIn: 3600 }, // an hour
                (err, token) => {
                  if(err) throw err;

                  // sending email if success
                  sendTestEmailConfirmation(user);
                  // sending email if success end
                  
                  res.json({
                    user: {
                      username: user.username,
                      email: user.email
                    }
                  });
                }
              )
            });
        })
      })
    })
});

//email confirmation
router.route('/confirmuserid').post((req, res) => {
  const { user_id, email } = req.body;
  if (!user_id){
    return res.status(400).json({ msg: 'User id did not exist' });
  }

  User.findOne({email})
  .then(user => {
    if(user){
      if(user.id == user_id){
        User.updateOne({email:email}, {signupStatus:"Setting Up"})
        .then(()=>{
          console.log(user);
          var token = jwt.sign({ id: user.id },
            process.env.jwtSecret,
            { expiresIn: 3600 }, // an hour
            );
          return res.status(200).json({
            msg: 'Have done',
            signupStatus: "Setting Up",
            token,
            user: {
              id: user.id,
              username: user.username,
              email: user.email
            }
          });
        });
      } else {
          return res.status(200).json({ 
            msg: 'Not match',
            user: {
              id: user.id,
              username: user.username,
              email: user.email
            }
          });
      }
    }
  });
});

//Get user active signals
router.route('/activate').post((req, res) => {
  console.log(req.body);
  const { username, email, userStatus, password, login_url } = req.body;
  if (!email){
    return res.status(400).json({ msg: 'User id did not exist' });
  }
  if (userStatus == "Activate")
  User.findOne({email})
  .then(user => {
    console.log(user);
    if(user){
      if(user.username == username){
        User.updateOne({email:email}, {signupStatus:"Active"})
        .then(()=>{

          sendSuccessEmail(user);
          
          return res.status(200).json({
            msg: 'Have done',
            signupStatus: "Activate",
            user: {
              id: user.id,
              username: user.username,
              email: user.email
            }
          });
        });
      } else {
        user.updateOne({email:email}, {signupStatus:"Failure"})
        .then(()=>{
          return res.status(200).json({ 
            msg: 'Failure',
            user: {
              id: user.id,
              username: user.username,
              email: user.email
            }
          });
        });
      }
    }
  });
})

// create/add a user for admin
router.route('/add').post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const role = req.body.role;
  const password = req.body.password;
  //const imageurl = req.file.path.replace("client/public/", '');

  const newUser = new User({
      username,
      email,
      role,
      password,
      companyName:" ",
      msg:" ",
      businesstype:" ",
      accountname:" ",
      mobile:" ",
      lastName:" ",
      firstName:" ",
      signupStatus: "Admin"
    });

    console.log(newUser)

    newUser.save()
    .then(() => res.json({
      user: {
        name: username,
        email: email        
      },
      msg:"success"
    }))
    .catch(err => res.status(400).json('Error: ' + err));
});

// edit a user for admin
router.route('/edit').post((req, res) => {
  // const username = req.body.username;
  // const email = req.body.email;
  // const role = req.body.role;
  // const password = req.body.password;
  // //const imageurl = req.file.path.replace("client/public/", '');

  // const newUser = new User({
  //     username,
  //     email,
  //     role,
  //     password,
  //   });

  // newUser.save()
  //   .then(() => res.json('User added!'))
  //   .catch(err => res.status(400).json('Error: ' + err));
});

// delete a user
router.route('/delete').post((req, res) => {
  const usersList = req.body;

  User.deleteMany({ _id: usersList }, function (err) {
    if (err) return handleError(err);
    // deleted at most one tank document
  });
});

module.exports = router;