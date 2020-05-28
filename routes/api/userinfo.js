const router = require('express').Router();
require('dotenv').config();

let User = require('../../models/user.model');

// get user info
// private

router.route('/:id').get((req, res) => {

  let id = req.params.id;

  User.findById(id, {mobile:0, password:0, createdAt:0, updatedAt:0, __v:0}, function(err, user){
      if(err) {
          res.send(err);
      }
      res.send(user);
  })
});

// update user info
// private

router.route('/:id').post((req, res) => {

    // let id = req.params.id;
  
    // User.findById(id, {_id:0, mobile:0, accountname:0, createdAt:0, updatedAt:0, __v:0}, function(err, user){
    //     if(err) {
    //         res.send(err);
    //     }
    //     res.send(user);
    // })

    User.updateOne({_id: req.params.id}, {accounturl: req.body.accountURL}, function (err, response) {
      if (response) {
        res.status(200).send(response);
      } else if (err) {
          res.status(400).send(err);
      }
    });
});

module.exports = router;