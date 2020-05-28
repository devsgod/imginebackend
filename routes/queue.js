const router = require('express').Router();
let Queue = require('../models/queue.model');

// @return all records of products are on selling
router.route('/').get((req, res) => {
  // return all fields
  // Queue.find()
  //   .then(data => res.json(data))
  //   .catch(err => res.status(400).json('Error: ' + err));

  // omit some fields ( id, created_at, updated_at )
  Queue.find(null, {createdAt:0, updatedAt:0, __v:0})
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ' + err));
});

// add selling product
router.route('/').post((req, res) => {

  const newQueue = new Queue({
    name: req.body.name,
    email: req.body.email,
    product: req.body.product,
    price: req.body.price,
    date: req.body.date,
    city: req.body.city,
    status: req.body.status
  });

  newQueue.save()
    .then(() => res.json(newQueue))
    .catch(err => {
      res.status(400).json('Error: ' + err)
    });
});

// update one record
router.route('/:id/update').put((req, res) => {
  Queue.findByIdAndUpdate(req.params.id, {$set: req.body}, {useFindAndModify: false}, function (err, response) {
    if (response) {
      res.status(200).send(response);
    } else if (err) {
        res.status(400).send(err);
    }
  });
});

module.exports = router;