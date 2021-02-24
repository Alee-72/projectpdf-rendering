const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const directory = "./src/images/";

const app = express();

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.post("/picture", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No files",
      });
    } else {
      const { picture } = req.files;
      picture.name = "somefile.pdf";
      fs.readdirSync(directory, (err, files) => {
        if (err) throw err;

        for (const file of files) {
          fs.unlink(path.join(directory, file), (err) => {
            if (err) throw err;
          });
        }
      });

      picture.mv("./src/images/" + picture.name);

      res.send({
        status: true,
        message: "File is uploaded",
      });
      //   fs.renameSync('abc.jpg','./src/images/*', function(err) {
      //     if ( err ) console.log('ERROR: ' + err);
      // });
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
