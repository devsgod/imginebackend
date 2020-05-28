const router = require('express').Router();
let Blog = require('../models/blog.model');
const multer = require('multer');

router.route('/').get((req, res) => {
  Blog.find()
    .then(Blogs => res.json(Blogs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

  // file upload start
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (process.env.NODE_ENV === 'production') {
        cb(null, 'client/build/upload/blogs');
      }
      else
      {
        cb(null, 'client/public/upload/blogs');
      }
    },
    filename: function (req, file, cb) {
      var fn = Date.now() + '-' + file.originalname;
      cb(null, fn);
    }
  });

  var upload = multer({ storage: storage }).single('file')
     
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        //return res.status(500).json(err)
    } else if (err) {
        //return res.status(500).json(err)
    }
    
    var obj = JSON.parse(req.body.blog);
    const title = obj.title;
    const author = obj.author;
    const category = obj.category;
    const text = obj.text;

    if (req.file)
    {
      let imageurl = '';
      if (process.env.NODE_ENV === 'production') {
        imageurl = req.file.path.replace("client/build/", '');
      }
      else {
        imageurl = req.file.path.replace("client/public/", '');
      }
      const newBlog = new Blog({
        title,
        author,
        category,
        text,
        imageurl
      });
      newBlog.save()
        .then(() => res.json('Client added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    }
    else if (req.file == null)
    {
      const newBlog2 = new Blog({
        title,
        author,
        category,
        text,
      });
      newBlog2.save()
        .then(() => res.json('Client added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    }
  })
  // file upload end
});

router.route('/edit').post((req, res) => {

  // file upload start
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (process.env.NODE_ENV === 'production') {
        cb(null, 'client/build/upload/blogs');
      }
      else
      {
        cb(null, 'client/public/upload/blogs');
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
    
    var obj = JSON.parse(req.body.blog);
    const title = obj.title;
    const author = obj.author;
    const category = obj.category;
    const text = obj.text;

    let newBlog = {};
    if (req.file)
    {
      let imageurl = '';
      if (process.env.NODE_ENV === 'production') {
        imageurl = req.file.path.replace("client/build/", '');
      }
      else {
        imageurl = req.file.path.replace("client/public/", '');
      }
      newBlog = {
        title,
        author,
        category,
        text,
        imageurl
      };
    }
    else if (req.file == null)
    {
      newBlog = {
        title,
        author,
        category,
        text,
      };
    }

    Blog.findByIdAndUpdate(obj.id, {$set: newBlog}, {useFindAndModify: false}, function (err, response) {
      if (response) {
        res.status(200).send(response);
      } else if (err) {
          res.status(400).send(err);
      }
    });
  })
});

router.route('/delete').post((req, res) => {
  const BlogsList = req.body;

  Blog.deleteMany({ _id: BlogsList }, function (err) {
    if (err) return handleError(err);
    // deleted at most one tank document
  });
});

module.exports = router;