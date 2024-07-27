const express = require("express");
const multer = require('multer');
const cors = require('cors');

const app = express();
app.use(cors()); // Allows incoming requests from any IP

// Start by creating some disk storage options:
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    // Sets file(s) to be saved in uploads folder in same directory
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
    // Sets saved filename(s) to be original filename(s)
  })
  
// Set saved storage options:
const uploads = multer({storage: storage });

app.post("/uploads", uploads.array("files"), (req, res) => {
// Sets multer to intercept files named "files" on uploaded form data

    console.log(req.body); // Logs form body values
    // console.log(req.files); // Logs any files
    res.json({ status: "File(s) uploaded successfully" });

});

app.listen(5000, function(){
    console.log("server running on port 5000");
});