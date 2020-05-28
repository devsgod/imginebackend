const router = require('express').Router();
let Client = require('../models/client.model');
const multer = require('multer');

router.route('/').get((req, res) => {
  Client.find()
    .then(Clients => res.json(Clients))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

  // file upload start
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (process.env.NODE_ENV === 'production') {
        cb(null, 'client/build/upload/clients');
      }
      else
      {
        cb(null, 'client/public/upload/clients');
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
    
    var obj = JSON.parse(req.body.client);
    const description = obj.description;
    let imageurl = '';
    if (process.env.NODE_ENV === 'production') {
      imageurl = req.file.path.replace("client/build/", '');
    }
    else {
      imageurl = req.file.path.replace("client/public/", '');
    }
    const newClient = new Client({
      description,
      imageurl
    });
    newClient.save()
      .then(() => res.json('Client added!'))
      .catch(err => res.status(400).json('Error: ' + err));
    })

  // file upload end
});

router.route('/edit').post((req, res) => {

  // file upload start
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (process.env.NODE_ENV === 'production') {
        cb(null, 'client/build/upload/clients');
      }
      else
      {
        cb(null, 'client/public/upload/clients');
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
    
    var obj = JSON.parse(req.body.client);
    const description = obj.description;

    let newClient = {};
    if (req.file)
    {
      let imageurl = '';
      if (process.env.NODE_ENV === 'production') {
        imageurl = req.file.path.replace("client/build/", '');
      }
      else {
        imageurl = req.file.path.replace("client/public/", '');
      }
      newClient = {
        description,
        imageurl
      };
    }
    else if (req.file == null)
    {
      newClient = {
        description,
      };
    }

    Client.findByIdAndUpdate(obj.id, {$set: newClient}, {useFindAndModify: false}, function (err, response) {
      if (response) {
        res.status(200).send(response);
      } else if (err) {
          res.status(400).send(err);
      }
    });
  })
});

router.route('/delete').post((req, res) => {
  const ClientsList = req.body;

  Client.deleteMany({ _id: ClientsList }, function (err) {
    if (err) return handleError(err);
    // deleted at most one tank document
  });
});

module.exports = router;