const express = require('express');

const port = 9000;

const app = express();

//database attechement 
const db = require('./config/db');

//model aatechmenet
const UserModel = require('./models/UserModel');

const fs = require('fs'); // the File System module into your script and assigns it to the fs variable. 

app.set('view engine', 'ejs');//ejs active

app.use(express.urlencoded()); //a middleware function provided by Express that parses incoming requests with URL-encoded payloads

const path = require('path'); //make a path

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));//uploads-image nu folder static banava

//----file upload :--------------------------------------------------------------

const multer = require('multer'); //multer attatch
const unlinkSync = require('fs');//used to import the file system module, which provides a variety of methods for interacting with the file system, such as reading and writing files. The unlinkSync function is a method within this module that is used to delete files synchronously.

const st = multer.diskStorage({
    // Set the destination where uploaded files will be stored
    destination: (req, res, cb) => {
        // 'uploads' is the directory where files will be saved
        cb(null, "uploads")
    },
    // Define how the uploaded file should be named
    filename: (req, file, cb) => {
        // Create a unique name using the current timestamp and a random number
        const uniqname = `${Date.now()}-${Math.random() * 100000}`;
        // Set the filename as the original fieldname from the form plus the unique name
        cb(null, `${file.fieldname}-${uniqname}`)
    }
})


const uploadFile = multer({ storage: st }).single('image');//sets up a middleware (uploadFile) that will handle a single file upload from the form field named 'image', storing it according to the previously defined storage configuration (st).
// Route handler for the root path ('/')
app.get('/', (req, res) => {
    // Query the database to find all users using the UserModel
    UserModel.find({})
        .then((user) => {
            // If successful, render the 'table' view and pass the retrieved users data to it
            return res.render('table', {
                users: user  // Pass the list of users to the view
            });
        }).catch((err) => {
            // If there's an error during the database query, log the error to the console
            console.log(err);
            return false;  // Return false in case of error (though this doesn't affect the response)
        });
});

// Route handler for the '/add' path
app.get('/add', (req, res) => {
    // Render the 'form' view, typically used to show a form to add a new user
    return res.render('form');
});

//Add Record In Mongo Db:-------------------------------------------------------------
// Define a POST route at '/insertRecord'. The 'uploadFile' middleware handles file uploads (e.g., an image).
// When a POST request is made to this route, the following happens:
app.post('/insertRecord', uploadFile, (req, res) => {
    
    // Destructure the 'name', 'email', 'password', 'gender', 'hobby', and 'city' fields from the request body.
    const { name, email, password, gender, hobby, city } = req.body;

    // Use the UserModel to create a new record in the database with the provided data.
    // The 'image' field is set to the path of the uploaded file.
    UserModel.create({
        name: name,
        email: email,
        password: password,
        gender: gender,
        hobby: hobby,
        city: city,
        image: req.file.path
    })
    .then(() => {
        // If the record is successfully added, log "Record added" to the console
        // and redirect the user to the home page.
        console.log("Record added");
        res.redirect('/');
    })
    .catch((err) => {
        // If an error occurs during the record creation, log the error to the console
        // and return 'false' to indicate the operation failed.
        console.log(err);
        return false;
    });
});


//delete Record:===================================================================
app.get('/deleteRecord', (req, res) => {
    // Extract the ID of the record to be deleted from the query string.
    let id = req.query.deleteId;

    // First, find the record by its ID in the UserModel collection.
    UserModel.findById(id)
        .then((single) => {
            // If the record is found, delete the file associated with this record from the filesystem.
            // 'single.image' is assumed to be the path to the file that needs to be deleted.
            fs.unlinkSync(single.image)
        }).catch((err) => {
            // If there is an error during the file deletion process, log the error.
            console.log(err);
            return false; // The request won't continue if there's an error here.
        })

    // Then, delete the record from the database using its ID.
    UserModel.findByIdAndDelete(id)
        .then((response) => {
            // If the record is successfully deleted, log a message and redirect the user to the home page.
            console.log("record delete");
            return res.redirect('/')
        }).catch((err) => {
            // If there is an error during the record deletion process, log the error.
            console.log(err);
            return false; // The request won't continue if there's an error here.
        })
})

//edit record:-------------------------------------------------------
app.get('/editRecord', (req, res) => {
    // Extract the 'editId' parameter from the query string of the incoming request.
    let id = req.query.editId;

    // Use the 'UserModel' to search the database for a record with the given 'id'.
    UserModel.findById(id)
        .then((single) => {
            // If the record is found, render the 'edit' view/template, passing the found record ('single') as data.
            return res.render('edit', {
                single
            });
        }).catch((err) => {
            // If there is an error during the database operation, log the error to the console.
            console.log(err);
            // Return 'false' to indicate the operation did not succeed (though this return statement does not have any real effect in this context).
            return false;
        })
})

//update record:----------------------------------------------------
// Define a route to handle POST requests at '/updateRecord'.
// The 'uploadFile' middleware is used to handle file uploads.

app.post('/updateRecord', uploadFile, (req, res) => {
    // Destructure properties from the request body.
    const { editid, name, email, password, gender, hobby, city } = req.body;
    
    // Check if a file has been uploaded.
    if (req.file) {
        // If a file is uploaded, find the user by their ID (editid).
        UserModel.findById(editid)
            .then((single) => {
                // If the user is found, delete the old image file associated with the user.
                fs.unlinkSync(single.image);
            }).catch((err) => {
                // Log any errors that occur during the file deletion process.
                console.log(err);
                return false; // Return false if there's an error.
            });
        
        // Update the user's information with the new data, including the new image file path.
        UserModel.findByIdAndUpdate(editid, {
            name: name,
            email: email,
            password: password,
            gender: gender,
            hobby: hobby,
            city: city,
            image: req.file.path // Save the path of the new uploaded file.
        }).then((response) => {
            // If the update is successful, log the success message and redirect to the homepage.
            console.log("Record updated");
            return res.redirect('/');
        }).catch((err) => {
            // Log any errors that occur during the update process.
            console.log(err);
            return false; // Return false if there's an error.
        });
    } else {
        // If no file is uploaded, find the user by their ID.
        UserModel.findById(editid)
            .then((single) => {
                // Update the user's information with the new data, but keep the old image path.
                UserModel.findByIdAndUpdate(editid, {
                    name: name,
                    email: email,
                    password: password,
                    gender: gender,
                    hobby: hobby,
                    city: city,
                    image: single.image // Keep the existing image path if no new file is uploaded.
                }).then((response) => {
                    // If the update is successful, log the success message and redirect to the homepage.
                    console.log("Record updated");
                    return res.redirect('/');
                }).catch((err) => {
                    // Log any errors that occur during the update process.
                    console.log(err);
                    return false; // Return false if there's an error.
                });
            }).catch((err) => {
                // Log any errors that occur during the process of finding the user by ID.
                console.log(err);
                return false; // Return false if there's an error.
            });
    }
});



//structure
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`server is run this port :- ${port}`);
})