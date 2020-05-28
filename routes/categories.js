const router = require('express').Router();
let Category = require('../models/category.model');
const auth = require('../middleware/auth');
const multer = require('multer');

// get all products
router.route('/').get((req, res) => {
  Category.find()
    .then(categories => res.json(categories))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route   POST api/items
// @desc    Create An Item
// @access  Private
router.post('/', auth, (req, res) => {
  const newItem = new Category({
    name: req.body.name,
    price: req.body.price,
    rating: req.body.rating
  });

  newItem.save().then(item => res.json(item));
});

// create/add a product
router.route('/add').post((req, res) => {

  const name = req.body.name;

  Category.find({'name' : name}).then(names => {
    if (names.length > 0) {
      res.json({'error' : 'current name exists now'});
    }
    else {
      const newCategory = new Category({
        name,
      });
      newCategory.save()
          .then(() => {
            res.json('Category added!')
          })
          .catch(err => res.status(400).json('Error: ' + err));
    }
  });
});

// edit product
router.route('/edit').post((req, res) => {

  const id = req.body._id;
  const name = req.body.name;

  Category.find({'name' : name}).then(names => {
    if (names.length > 0) {
      res.json({'error' : 'current name exists now'});
    }
    else {
      const newCategory = {
        name
      };

      console.log(id);

      Category.findByIdAndUpdate(id, {$set: newCategory}, {useFindAndModify: false}, function (err, response) {
        if (response) {
          res.status(200).send(response);
        } else if (err) {
          res.status(400).send(err);
        }
      });
    }
  });

});


// delete a product
router.route('/delete').post((req, res) => {
  const categoryList = req.body;

  Category.deleteMany({ _id: categoryList }, function (err, response) {
    if (response) {
      res.status(200).send(response);
    } else if (err) {
      res.status(400).send(err);
    }

    if (err) return handleError(err);
    // deleted at most one tank document
  });
});

module.exports = router;