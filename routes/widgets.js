const router = require('express').Router();
let Widget = require('../models/widget.model');
const multer = require('multer');

router.route('/').get((req, res) => {
  Widget.find()
    .then(Widgets => res.json(Widgets))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  // file upload start
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (process.env.NODE_ENV === 'production') {
        cb(null, 'client/build/upload/widgets');
      }
      else
      {
        cb(null, 'client/public/upload/widgets');
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
    
    var obj = JSON.parse(req.body.widget);
    const title = obj.title;
    const description = obj.description;
    console.log(req.file.path);
    let imageurl = '';
    if (process.env.NODE_ENV === 'production') {
      imageurl = req.file.path.replace("client/build/", '');
    }
    else {
      imageurl = req.file.path.replace("client/public/", '');
    }   console.log(imageurl);

    const newWidget = new Widget({
      title,
      description,
      imageurl
    });
    newWidget.save()
      .then(() => res.json('Widget added!'))
      .catch(err => res.status(400).json('Error: ' + err));
    })

  // file upload end
});

router.route('/edit').post((req, res) => {
  // file upload start
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (process.env.NODE_ENV === 'production') {
        cb(null, 'client/build/upload/widgets');
      }
      else
      {
        cb(null, 'client/public/upload/widgets');
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
    
    var obj = JSON.parse(req.body.widget);
    const title = obj.title;
    const description = obj.description;

    let newWidget = {};
    if (req.file)
    {
      let imageurl = '';
      if (process.env.NODE_ENV === 'production') {
        imageurl = req.file.path.replace("client/build/", '');
      }
      else {
        imageurl = req.file.path.replace("client/public/", '');
      }
      newWidget = {
        title,
        description,
        imageurl
      };
    }
    else if (req.file == null)
    {
      newWidget = {
        title,
        description,
      };
    }

    Widget.findByIdAndUpdate(obj.id, {$set: newWidget}, {useFindAndModify: false}, function (err, response) {
      if (response) {
        res.status(200).send(response);
      } else if (err) {
          res.status(400).send(err);
      }
    });
  })
});

router.route('/delete').post((req, res) => {
  const WidgetsList = req.body;

  Widget.deleteMany({ _id: WidgetsList }, function (err) {
    if (err) return handleError(err);
    // deleted at most one tank document
  });
});

module.exports = router;