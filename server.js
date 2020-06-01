const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
// const multer = require('multer');

var compression = require('compression');

require('dotenv').config();

const app = express();
app.use(compression());
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// file upload start

/*
app.post('/upload/:category',function(req, res) {
  var category = req.params['category'];
  var url = "";

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      url = 'client/public/upload/' + category + 's';
      cb(null, 'client/public/upload/' + category + 's')
    },
    filename: function (req, file, cb) {
      var fn = Date.now() + '-' + file.originalname;
      url += fn;
      cb(null, fn)
    }
  })

  var upload = multer({ storage: storage }).single('file')
     
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }
    return res.status(200).send(req.file)
    
  })

});*/
// file upload end

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

const auth_middleware = require('./middleware/auth');

const queueRouter = require('./routes/queue');
const analysisRouter = require('./routes/analysis');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const productsRouter = require('./routes/products');
const categoryRouter = require('./routes/categories');
const orderRouter = require('./routes/orders');

const blogsRouter = require('./routes/blogs');
const clientsRouter = require('./routes/clients');
const testimonialsRouter = require('./routes/testimonials');
const widgetsRouter = require('./routes/widgets');
const featuresRouter = require('./routes/features');
const contactRouter = require('./routes/contact');
const emailconfirmRouter = require('./routes/emailconfirm');
const newsletterRouter = require('./routes/newsletter');

const userinfoRouter = require('./routes/api/userinfo');

app.use('/queue', queueRouter);
app.use('/analysis', analysisRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/products', productsRouter);
//add category
app.use('/category', categoryRouter);
app.use('/orders', orderRouter);

app.use('/blogs', blogsRouter);
app.use('/clients', clientsRouter);
app.use('/testimonials', testimonialsRouter);
app.use('/widgets', widgetsRouter);
app.use('/features', featuresRouter);
app.use('/contact', contactRouter);
app.use('/emailconfirm', emailconfirmRouter);
app.use('/newsletter', newsletterRouter);

app.use('/api/userinfo', userinfoRouter);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production'){
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
