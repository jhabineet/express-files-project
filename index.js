const express = require("express");
const app = express();
const path = require('path');
const fs = require("fs");
const PORT = 3000;

//i want to display the files folder content in the browser
app.get("/files", function(req, res) {
    fs.readdir("./files/", function(err, files) {
    if(files.length == 0)
        res.status(400).send("No Files are present");
    else {
        res.status(200).json(files);
    }})
})

// now i want to return the contents of the given file names--
app.get("/files/:filename", function(req, res) {
    const filename = req.params.filename; // i am getting the filename from the url parameter mtlb URL se filename ko extract kar rhe hai

    // HERE I CAN USE TWO TECHNIQUE OF JOINING PATH :-
    // 1. By direct concatination-
    // const filePath = "./files/" + filename; // i am creating the full path of the file by concat
                    //    OR
    // 2. Use path.join() for safe path construction-
    const filePath = path.join(__dirname, "files", filename); // Join the paths safely

    fs.readFile(filePath, "utf-8" , function(err, data) {
        console.log("data is comming from here", data);
        if(err) {
            res.status(404).send("File Not Found");
        }
        else {
            console.log(data);
            res.status(200).send(data);
        }
    })
})

// for any other api endpoints -
app.get("*", function (req, res) {
    res.status(404).send("Page Not Found");
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})