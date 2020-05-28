const router = require('express').Router();
let Product = require('../models/product.model');
let Category = require('../models/category.model');
const auth = require('../middleware/auth');
const multer = require('multer');

// added invoice
const fs = require("fs");

// get all products
router.route('/').get((req, res) => {
  Product.find()
      .populate("categoryInfo")
    .then(products => {
        let realData = [];
        let tempData = {};
        let insertData = {};

        if (products) {
            for (let i = 0; i < products.length; i++ ){
                tempData = products[i];
                insertData = {
                    productId : tempData._id,
                    productName : tempData.name,
                    imageSrc : tempData.imageurl,
                    price : tempData.price,
                    oldPrice : tempData.oldPrice,
                    rating : tempData.rating,
                    quantity: tempData.quantity,
                    updatedAt : tempData.updatedAt,
                    description : tempData.description,
                    categoryId : tempData.categoryInfo ? tempData.categoryInfo._id : '',
                    categoryName : tempData.categoryInfo ? tempData.categoryInfo.name : ''
                };
                realData.push(insertData);
            }
        }
      res.json(realData);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


// @route   POST api/items
// @desc    Create An Item
// @access  Private
router.post('/', (req, res) => {
  var obj = req.body;

  // where
  let searchValue = obj.searchValue;
  let category = obj.categoryValue;
  let minPrice = obj.minPrice;
  let maxPrice = obj.maxPrice;
  let bInitState = obj.bInitState;
  let stepValue = obj.stepValue;

  // order by
  let sortValue = obj.sortValue;

  let queryObj = {};
  let subq = {};

  if (searchValue !== '') {
    queryObj['name'] = new RegExp(searchValue, 'i');
  }
  if (category !== '') {
    queryObj['categoryInfo'] = {_id : category};
  }

  // if (maxPrice !== 0) {
  //   queryObj['price'] = {$in : [minPrice, maxPrice]};
  // }

  let recordCount = 0;
  var retValue = {};
  if (bInitState === true) {
    Product.find().sort({'price' : -1}).limit(1).then(max => {
      retValue["maxValue"] = max[0].price;
      Category.find({}, {name : 1, _id:1}).then(categories => {
        retValue['categories'] = categories;
        if (sortValue === 'popular') {
          Product.find(queryObj).sort({'name': 1}).skip(stepValue).limit(10)
              .then(result => {
                retValue['result'] = result;

                Product.find(queryObj).countDocuments().then(count => {
                  retValue['recordCount'] = count;
                  res.json(retValue);
                });
              })
              .catch({})
        }
        else if (sortValue === 'rating') {
          Product.find(queryObj).sort({rating: -1}).skip(stepValue).limit(10)
              .then(result => {
                retValue['result'] = result;

                Product.find(queryObj).countDocuments().then(count => {
                  retValue['recordCount'] = count;
                  res.json(retValue);
                });
              })
              .catch({})
        }
        else if (sortValue === 'latest') {
          Product.find(queryObj).sort({updatedAt: 1}).skip(stepValue).limit(10)
              .then(result => {
                retValue['result'] = result;

                Product.find(queryObj).countDocuments().then(count => {
                  retValue['recordCount'] = count;
                  res.json(retValue);
                });
              })
              .catch({})
        }
        else if (sortValue === 'pricelow') {
          Product.find(queryObj).sort({price: 1}).skip(stepValue).limit(10)
              .then(result => {
                retValue['result'] = result;

                Product.find(queryObj).countDocuments().then(count => {
                  retValue['recordCount'] = count;
                  res.json(retValue);
                });
              })
              .catch({})
        }
        else if (sortValue === 'pricehight') {
          Product.find(queryObj).sort({price: -1}).skip(stepValue).limit(10)
              .then(result => {
                retValue['result'] = result;

                Product.find(queryObj).countDocuments().then(count => {
                  retValue['recordCount'] = count;
                  res.json(retValue);
                });
              })
              .catch({})
        }
        else if (sortValue === 'new') {
          Product.find(queryObj).sort({updatedAt: -1}).skip(stepValue).limit(10)
              .then(result => {
                retValue['result'] = result;

                Product.find(queryObj).countDocuments().then(count => {
                  retValue['recordCount'] = count;
                  res.json(retValue);
                });
              })
              .catch({})
        }
        else {
          Product.find(queryObj).skip(stepValue).limit(10)
              .then(result => {
                retValue['result'] = result;

                Product.find(queryObj).countDocuments().then(count => {
                  retValue['recordCount'] = count;
                  res.json(retValue);
                });
              })
              .catch({})
        }
      });

    })
  }
  else {

    queryObj['price'] = {$gte : minPrice, $lte : maxPrice};

    // queryObj['price'] = {$lte : maxPrice};


    if (sortValue === 'popular') {
      Product.find(queryObj).sort({'name': 1}).skip(stepValue).limit(10)
          .then(result => {
            retValue['result'] = result;

            Product.find(queryObj).countDocuments().then(count => {
              retValue['recordCount'] = count;
              res.json(retValue);
            });
          })
          .catch({})
    }
    else if (sortValue === 'rating') {
      Product.find(queryObj).sort({rating: -1}).skip(stepValue).limit(10)
          .then(result => {
            retValue['result'] = result;

            Product.find(queryObj).countDocuments().then(count => {
              retValue['recordCount'] = count;
              res.json(retValue);
            });
          })
          .catch({})
    }
    else if (sortValue === 'latest') {
      Product.find(queryObj).sort({updatedAt: 1}).skip(stepValue).limit(10)
          .then(result => {
            retValue['result'] = result;

            Product.find(queryObj).countDocuments().then(count => {
              retValue['recordCount'] = count;
              res.json(retValue);
            });
          })
          .catch({})
    }
    else if (sortValue === 'pricelow') {
      Product.find(queryObj).sort({price: 1}).skip(stepValue).limit(10)
          .then(result => {
            retValue['result'] = result;

            Product.find(queryObj).countDocuments().then(count => {
              retValue['recordCount'] = count;
              res.json(retValue);
            });
          })
          .catch({})
    }
    else if (sortValue === 'pricehight') {
      Product.find(queryObj).sort({price: -1}).skip(stepValue).limit(10)
          .then(result => {
            retValue['result'] = result;

            Product.find(queryObj).countDocuments().then(count => {
              retValue['recordCount'] = count;
              res.json(retValue);
            });
          })
          .catch({})
    }
    else if (sortValue === 'new') {
      Product.find(queryObj).sort({'createdAt': -1}).skip(stepValue).limit(10)
          .then(result => {
            retValue['result'] = result;

            Product.find(queryObj).countDocuments().then(count => {
              retValue['recordCount'] = count;
              res.json(retValue);
            });
          })
          .catch({})
    }
    else {
      Product.find(queryObj).skip(stepValue).limit(10)
          .then(result => {
            retValue['result'] = result;

            Product.find(queryObj).countDocuments().then(count => {
              retValue['recordCount'] = count;
              res.json(retValue);
            });
          })
          .catch({})
    }
  }
});

// router.post('/', auth, (req, res) => {
//   const newItem = new Product({
//     name: req.body.name,
//     price: req.body.price,
//     rating: req.body.rating
//   });
//
//   newItem.save().then(item => res.json(item));
// });

// create/add a product
router.route('/add').post((req, res) => {


  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (process.env.NODE_ENV === 'production') {
            cb(null, 'client/build/upload/products');
        }
        else
        {
            cb(null, 'client/public/upload/products');
        }
    },
    filename: function (req, file, cb) {
      var fn = Date.now() + '-' + file.originalname;
      cb(null, fn)
    }
  });

  var upload = multer({ storage: storage }).single('file');
     
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }
    
    var obj = JSON.parse(req.body.product);
    const name = obj.name;
    const price = obj.price;
    const oldPrice = obj.oldPrice;
    const quantity = obj.quantity;
    const rating = obj.rating;
    const categoryId = obj.categoryId;
    const description = obj.description;
    console.log(req.file.path);
    let imageUrl = '';
      if (process.env.NODE_ENV === 'production') {
          imageUrl = req.file.path.replace("client/build/", '');
          imageUrl = imageUrl.replace("client/build/", '');
      }
      else {
          imageUrl = req.file.path.replace("client/public/", '');
          imageUrl = imageUrl.replace("client/public/", '');
      }

      console.log(imageUrl);
    const newProduct = new Product({
      name,
      price,
      oldPrice,
      quantity,
      rating,
      'imageurl' : imageUrl,
      categoryInfo : categoryId,
      description
    });

    newProduct.save()
      .then(() => res.json('Product added!'))
      .catch(err => res.status(400).json('Error: ' + err));
    })
});

// edit product
router.route('/edit').post((req, res) => {

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (process.env.NODE_ENV === 'production') {
            cb(null, 'client/build/upload/products');
        }
        else
        {
            cb(null, 'client/public/upload/products');
        }
    },
    filename: function (req, file, cb) {
      var fn = Date.now() + '-' + file.originalname;
      cb(null, fn)
    }
  });

  var upload = multer({ storage: storage }).single('file');
     
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        //return res.status(500).json(err)
    } else if (err) {
        //return res.status(500).json(err)
    }
    
    var obj = JSON.parse(req.body.product);
    const name = obj.name;
    const price = obj.price;
    const oldPrice = obj.oldPrice;
    const rating = obj.rating;
    const categoryId = obj.categoryId;
    const quantity = obj.quantity;
    const description = obj.description;

    let newProduct = {};
    if (req.file)
    {
        let imageurl = '';
        if (process.env.NODE_ENV === 'production') {
            imageurl = req.file.path.replace("client/build/", '');
        }
        else {
            imageurl = req.file.path.replace("client/public/", '');
        }
      newProduct = {
        name,
        price,
        oldPrice,
        quantity,
        rating,
        imageurl,
        categoryInfo : categoryId,
        description
      };
    }
    else if (req.file == null)
    {
      newProduct = {
        name,
        price,
        oldPrice,
        quantity,
        rating,
        categoryInfo : categoryId,
        description
      };
    }

    Product.findByIdAndUpdate(obj.id, {$set: newProduct}, {useFindAndModify: false}, function (err, response) {
      if (response) {
        res.status(200).send(response);
      } else if (err) {
          res.status(400).send(err);
      }
    });
  })
});


// delete a product
router.route('/delete').post((req, res) => {
  const productsList = req.body;

  Product.deleteMany({ _id: productsList }, function (err, response) {
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