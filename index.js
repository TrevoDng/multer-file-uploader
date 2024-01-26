var express = require('express');
var cors = require('cors');
require('dotenv').config()

const fs = require('fs');
const bodyparser = require('body-parser');
var app = express();

const multer = require('multer');
const { type } = require('os');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'public/');
  },
  filename: function (req, file, cb) {
  //console.log(\"=====>\", file.originalname)
  cb(null, Date.now() + "-" + file.originalname);
  }
  });

  const upload = multer({
  storage: storage,
  limits: {
  fileSize: 1024 * 1024
  }
  });

app.post("/api/fileanalyse", upload.single("upfile"), (req, res)=> {
  console.log(req.file)
  //const stats = fs.statSync(upfile);
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  })
  //res.send({result: 'ok'});
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
