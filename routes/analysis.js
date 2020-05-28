const router = require('express').Router();
let Analysis = require('../models/analysis.model');

const todayID = () => {
  let ts = Date.now();

  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();

  // prints date & time in YYYY-MM-DD format
  return year + "_" + month + "_" + date;
}


// @return Analysis all records
router.route('/').get((req, res) => {
  Analysis.find()
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @return Analysis record Today, if no record, add new record and return it
router.route('/today').get((req, res) => {

  Analysis.findOne({'today': todayID()})
    .then(data => {
      if (data == null)
      {
        const today = todayID();
        const signin = signup = signout = soldproducts = 0;

        const newAnalysis = new Analysis({
          today,
          signin,
          signup,
          signout,
          soldproducts
        });

        newAnalysis.save()
          .then(() => res.json(newAnalysis));
          
      }
      else {
        res.json(data)
      }
    })
    .catch(err => {
      res.status(400).json('Error: ' + err)
    });
});

// increase visitor - signin
router.route('/plus/visitor').get((req, res) => {
  Analysis.findOne({'today': todayID()})
  .then(data => {
    let temp = data;
    temp.signin += 1;
    temp.save();
    res.json(temp);
  })
  .catch(err => res.status(400).json('Error: ' + err));
});

// decrease visitor - signout
router.route('/minus/visitor').get((req, res) => {
  Analysis.findOne({'today': todayID()})
  .then(data => {
    let temp = data;
    temp.signout += 1;
    temp.save();
    res.json(temp);
  })
  .catch(err => res.status(400).json('Error: ' + err));
});

// increase signed user - signup
router.route('/plus/user').get((req, res) => {
  Analysis.findOne({'today': todayID()})
  .then(data => {
    let temp = data;
    temp.signup += 1;
    temp.save();
    res.json(temp);
  })
  .catch(err => res.status(400).json('Error: ' + err));
});

// increase sold product
router.route('/plus/sold').get((req, res) => {
  Analysis.findOne({'today': todayID()})
  .then(data => {
    let temp = data;
    temp.soldproducts += 1;
    temp.save();
    res.json(temp);
  })
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;