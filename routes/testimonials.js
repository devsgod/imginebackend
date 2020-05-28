const router = require('express').Router();
let Testimonial = require('../models/testimonial.model');
const multer = require('multer');

router.route('/').get((req, res) => {
  Testimonial.find()
    .then(Testimonials => res.json(Testimonials))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

  // file upload start
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (process.env.NODE_ENV === 'production') {
        cb(null, 'client/build/upload/testimonials');
      }
      else
      {
        cb(null, 'client/public/upload/testimonials');
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
    
    var obj = JSON.parse(req.body.testimonial);
    const name = obj.name;
    const position = obj.position;
    const content = obj.content;

    let imageurl = '';
    if (process.env.NODE_ENV === 'production') {
      imageurl = req.file.path.replace("client/build/", '');
    }
    else {
      imageurl = req.file.path.replace("client/public/", '');
    }
    // console.log(req.body.testimonial);
    // console.log(req.file);

    const newTestimonial = new Testimonial({
      name,
      position,
      content,
      imageurl
    });
    newTestimonial.save()
      .then(() => res.json('Testimonial added!'))
      .catch(err => res.status(400).json('Error: ' + err));
    })

    //return res.status(200).send(req.file)

  // file upload end
});

router.route('/edit').post((req, res) => {

  // file upload start
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (process.env.NODE_NEV === 'production'){
        cb(null, 'client/build/upload/testimonials')
      }
      else {
        cb(null, 'client/public/upload/testimonials')
      }
    },
    filename: function (req, file, cb) {
      var fn = Date.now() + '-' + file.originalname;
      cb(null, fn)
    }
  });

  var upload = multer({ storage: storage }).single('file')
     
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        //return res.status(500).json(err)
    } else if (err) {
        //return res.status(500).json(err)
    }
    
    var obj = JSON.parse(req.body.testimonial);
    const name = obj.name;
    const position = obj.position;
    const content = obj.content;

    let newTestimonial = {};
    if (req.file)
    {

      let imageurl = '';
      if (process.env.NODE_ENV === 'production') {
        imageurl = req.file.path.replace("client/build/", '');
      }
      else {
        imageurl = req.file.path.replace("client/public/", '');
      }
      newTestimonial = {
        name,
        position,
        content,
        imageurl
      };
    }
    else if (req.file == null)
    {
      newTestimonial = {
        name,
        position,
        content,
      };
    }

    Testimonial.findByIdAndUpdate(obj.id, {$set: newTestimonial}, {useFindAndModify: false}, function (err, response) {
      if (response) {
        res.status(200).send(response);
      } else if (err) {
          res.status(400).send(err);
      }
    });
  })
});

router.route('/delete').post((req, res) => {
  const TestimonialsList = req.body;

  Testimonial.deleteMany({ _id: TestimonialsList }, function (err) {
    if (err) return handleError(err);
    // deleted at most one tank document
  });
});

module.exports = router;