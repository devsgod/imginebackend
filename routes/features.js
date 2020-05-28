const router = require('express').Router();
let Feature = require('../models/feature.model');
const multer = require('multer');

router.route('/').get((req, res) => {
  Feature.find()
    .then(Features => res.json(Features))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  // file upload start
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (process.env.NODE_ENV === 'production') {
        cb(null, 'client/build/upload/features')
      }else {
        cb(null, 'client/public/upload/features')
      }
    },
    filename: function (req, file, cb) {
      var fn = Date.now() + '-' + file.originalname;
      cb(null, fn)
    }
  })

  var upload = multer({ storage: storage }).single('file')
     
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        //return res.status(500).json(err)
    } else if (err) {
        //return res.status(500).json(err)
    }
    
    var obj = JSON.parse(req.body.feature);
    const title = obj.title;
    const text = obj.text;
    let imageurl = '';
    if (process.env.NODE_ENV === 'production') {
      imageurl = req.file.path.replace("client/build/", '');
    }
    else {
      imageurl = req.file.path.replace("client/public/", '');
    }
    const newFeature = new Feature({
      title,
      text,
      imageurl
    });
    newFeature.save()
      .then(() => res.json('Feature added!'))
      .catch(err => res.status(400).json('Error: ' + err));
    })

  // file upload end
});

router.route('/edit').post((req, res) => {
  // file upload start
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (process.env.NODE_ENV === 'production') {
        cb(null, 'client/build/upload/features')

      }else {
        cb(null, 'client/public/upload/features')
      }

    },
    filename: function (req, file, cb) {
      var fn = Date.now() + '-' + file.originalname;
      cb(null, fn)
    }
  })

  var upload = multer({ storage: storage }).single('file')
     
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        //return res.status(500).json(err)
    } else if (err) {
        //return res.status(500).json(err)
    }
    
    var obj = JSON.parse(req.body.feature);
    const title = obj.title;
    const text = obj.text;

    let newFeature = {};
    if (req.file)
    {
      let imageurl = '';
      if (process.env.NODE_ENV === 'production') {
        imageurl = req.file.path.replace("client/build/", '');
      }
      else {
        imageurl = req.file.path.replace("client/public/", '');
      }
      newFeature = {
        title,
        text,
        imageurl
      };
    }
    else if (req.file == null)
    {
      newFeature = {
        title,
        text,
      };
    }

    Feature.findByIdAndUpdate(obj.id, {$set: newFeature}, {useFindAndModify: false}, function (err, response) {
      if (response) {
        res.status(200).send(response);
      } else if (err) {
          res.status(400).send(err);
      }
    });
  })
});

router.route('/delete').post((req, res) => {
  const FeaturesList = req.body;

  Feature.deleteMany({ _id: FeaturesList }, function (err) {
    if (err) return handleError(err);
    // deleted at most one tank document
  });
});

module.exports = router;